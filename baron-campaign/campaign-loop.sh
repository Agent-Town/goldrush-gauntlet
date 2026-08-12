#!/bin/zsh
setopt NULL_GLOB
# THE BARON CAMPAIGN LOOP — runs rounds for hours, each reading the growing war-room, until
# a deadline / round cap / a STOP file. Rotates the codex model for diversity. Commits every
# round so the memory is durable and progress is watchable. Cleans old arenas to spare disk.
G=/Users/robin/Claude/Projects/gr-gauntlet
CAMP=$G/baron-campaign
MIRROR=/Users/robin/Claude/Projects/goldrush-gauntlet
DEADLINE=$(date -v +6H +%s)          # ~6 hours; extend by editing, stop early with: touch STOP
MAXROUND=20
MODELS=(gpt-5.6-sol)   # owner ruling: Sol xhigh is the best mind; diversity comes from prime vs codex SCAFFOLD, not weaker models
echo "=== CAMPAIGN LOOP START $(date +%H:%M), deadline $(date -r $DEADLINE +%H:%M) ===" >> $CAMP/campaign.log

# wait for round 1 (already in flight) to finish before compounding on it
until grep -q "ATTACK DONE rig=codex" $CAMP/campaign.log 2>/dev/null || grep -q "r1 COMPLETE" $CAMP/campaign.log 2>/dev/null; do
  [ $(date +%s) -ge $DEADLINE ] && break; sleep 60
done

n=2
while [ $n -le $MAXROUND ]; do
  [ -f $CAMP/STOP ] && { echo "=== STOP file — loop ends $(date +%H:%M) ===" >> $CAMP/campaign.log; break; }
  [ $(date +%s) -ge $DEADLINE ] && { echo "=== deadline — loop ends $(date +%H:%M) ===" >> $CAMP/campaign.log; break; }
  model=${MODELS[$(( (n-2) % ${#MODELS[@]} + 1 ))]}
  echo "=== ROUND r$n (prime+codex on $model) $(date +%H:%M) ===" >> $CAMP/campaign.log
  $CAMP/attack.sh r$n $model
  # secure? flag it loudly, keep going for better/diverse solutions
  for f in $CAMP/players/*-r$n-outcome.json; do
    grep -q '"secured": *true\|"secured":true' "$f" 2>/dev/null && { echo "🏆 SECURED in r$n: $(basename $f)" | tee -a $CAMP/campaign.log > $CAMP/SECURED-r$n.txt; }
  done
  # durable memory: commit+push the growing war-room
  ( cd $MIRROR && rm -rf baron-campaign && cp -R $G/baron-campaign . && rm -rf baron-campaign/arenas && git add baron-campaign >/dev/null 2>&1 && git commit -q -m "baron-campaign: round r$n ($model) — attempts + reasoning banked" >/dev/null 2>&1 && git push -q >/dev/null 2>&1 )
  # spare disk: drop this round's arena working dirs (artifacts already harvested to players/attempts/tapes)
  rm -rf $CAMP/arenas/*-r$n
  n=$((n+1))
done
echo "=== CAMPAIGN LOOP END $(date +%H:%M), ran through r$((n-1)) ===" >> $CAMP/campaign.log
