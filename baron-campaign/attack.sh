#!/bin/zsh
setopt NULL_GLOB   # zsh aborts on non-matching globs; round 1 has no prior r*-*.md yet
# THE BARON CAMPAIGN — flat, serial (each rig reads the prior rig's fresh entry, then attacks).
G=/Users/robin/Claude/Projects/gr-gauntlet
CAMP=$G/baron-campaign
ROUND=${1:-r1}
CXMODEL=${2:-gpt-5.6-sol}
mkdir -p $CAMP/logs $CAMP/players $CAMP/arenas

for spec in "prime:PRIME" "codex-${CXMODEL##gpt-5.}:CODEX"; do
  rig=${spec%%:*}; kind=${spec##*:}
  out=$CAMP/players/$rig-$ROUND-outcome.json
  [ -f "$out" ] && { echo "skip $rig $ROUND"; continue; }
  A=$CAMP/arenas/$rig-$ROUND/arena
  [ -d "$A/scripts" ] || { mkdir -p $CAMP/arenas/$rig-$ROUND; cp -Rc $G/heat3/base-arena $A; }
  {
    echo "# BARON WAR-ROOM — read, then beat the Baron a DIFFERENT way than what failed."
    cat $CAMP/BOARD.md
    echo "\n===== REFERENCE WIN (rob, human, wave 30) — LEARN THE PRINCIPLE ====="; cat $CAMP/attempts/01-rob-reference-win.md
    echo "\n===== PRIOR ATTEMPTS THIS CAMPAIGN (build on these) ====="
echo "\n(A prior agent (prime) left its own mechanics notes below — treat as a lead, verify against the source yourself.)"; cat $CAMP/attempts/00-prime-sol-seed-analysis.md 2>/dev/null; for a in $CAMP/attempts/r*-*.md; do [ -f "$a" ] && { echo "\n--- $(basename $a) ---"; cat "$a"; }; done
    echo "\n===== YOUR TASK ====="
    echo "SECURE e1-baron (seed e1-baron-01): node scripts/gr-sim.mjs --contract e1-baron --seed e1-baron-01 (views stdout, ONE order-array per view stdin). READ public/skill.md for verbs (SET_WEAPON, BLAST_AT, PICK_UPGRADE, CONTEXT_ACTION). The win is COMBINED: max-upgraded turrets for damage + palisades as SHOT-DECOYS (not a blocking wall) + blast cycling + heavy drafting. Deterministic player.mjs; <=6 runs; STOP on first secure; overwrite outcome.json each run. THEN write attempt.md here: hypothesis, what you did, wave reached, WHY you died or how you won, one source-grounded note for the next rig."
  } > $A/BARON.md
  cp $CAMP/tapes/rob-baron-reference-w30.json $A/rob-baron-reference-w30-tape.json 2>/dev/null
  echo "--- $rig $ROUND $(date +%H:%M) ---" >> $CAMP/logs/$rig-$ROUND.log
  cd $A
  if [ "$kind" = PRIME ]; then
    HOME=$G/prime-home $G/fix-prime/prime-agent.sh --dist --mode json -p "Do the task in the file at: BARON.md" >> $CAMP/logs/$rig-$ROUND.log 2>&1
  else
    codex exec --sandbox workspace-write --skip-git-repo-check -m $CXMODEL -c model_reasoning_effort="xhigh" "Do the task in the file at: BARON.md" >> $CAMP/logs/$rig-$ROUND.log 2>&1
  fi
  cd $G
  [ -f "$A/outcome.json" ] && cp "$A/outcome.json" "$out"
  [ -f "$A/player.mjs" ] && cp "$A/player.mjs" "$CAMP/players/$rig-$ROUND-player.mjs"
  [ -f "$A/attempt.md" ] && cp "$A/attempt.md" "$CAMP/attempts/$ROUND-$rig.md"
  echo "ATTACK DONE rig=$rig round=$ROUND -> $(head -c 120 "$out" 2>/dev/null || echo NONE)" | tee -a $CAMP/campaign.log
done
echo "=== BARON ATTACK $ROUND COMPLETE $(date +%H:%M) ===" >> $CAMP/campaign.log
