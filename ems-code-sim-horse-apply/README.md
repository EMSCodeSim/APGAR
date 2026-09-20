# EMS_Code_SIM apply kit (from APGAR handoff agent)

This agent can push to APGAR only. Apply these files on `EMSCodeSim/EMS_Code_SIM`.

## Includes
1. Horse-crush teaching-path / transport UX improvements
2. Breath-sound simulator restore (stridor/neck, RML/lingula, CSS tokens, responsive.css)

## Apply from EMS_Code_SIM root
```bash
bash /path/to/ems-code-sim-horse-apply/APPLY.sh .
git checkout -b cursor/horse-crush-improvements-11c1
git add -A
git commit -m "Improve horse-crush scenario and restore breath-sound simulator teaching features"
git push -u origin HEAD
```

## Cloud Agent paste prompt
Apply updates from EMSCodeSim/APGAR branch `cursor/horse-crush-patch-handoff-11c1` folder `ems-code-sim-horse-apply/`. Copy files into this repo, create branch `cursor/horse-crush-improvements-11c1`, run `node tools/test-horse-crush-phase-plan.js` and related contract tests, commit, push, and open a PR to main.
