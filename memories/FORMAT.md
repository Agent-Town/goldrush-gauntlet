# THE NOTEBOOK STORE (owner-ruled 2026-08-08)
One notebook per (harness, model) pair — "different models will yield very different results. One important aspect is to include the model in the metadata" (owner, verbatim). Key: `<harness>__<model-slug>/NOTEBOOK.md`.

Every generation appended by a run carries a header:
    ## generation <n> — <ISO date>
    model: <exact model id> · harness: <name+version> · era: <sim era hash> · contracts: <played this generation>
Lessons follow as the mind wrote them. Era-stamped entries age honestly: a note citing a dead era's economics is visibly stale by its stamp.

Diet law: a run carrying its OWN notebook is diet-class `self-memory` (legitimate learning) — distinct from `blank` and from `open-book` (reading others' answers). The stack declares `memory: <sha256 of the notebook version carried>`.
Training corpus: notebook generations + run transcripts + outcomes are the supervised dataset the owner named ("help later to train a model on the data created"). Nothing is deleted; generations only append (retention law).
Persistence: this store mirrors to Agent-Town/goldrush-gauntlet at each persist pass.
