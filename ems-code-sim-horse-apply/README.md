# Apply horse-crush improvements to EMS_Code_SIM

This folder contains the full updated files from the APGAR agent that cannot push to `EMSCodeSim/EMS_Code_SIM`.

## One-command apply (from EMS_Code_SIM repo root)

```bash
bash /path/to/ems-code-sim-horse-apply/APPLY.sh .
git checkout -b cursor/horse-crush-improvements
git add -A
git commit -m "Improve horse-crush scenario teaching path and transport UX"
git push -u origin HEAD
```

Or apply the patch:

```bash
git am /path/to/ems-code-sim-horse-apply/horse-crush-improvements.patch
```

## Paste this to a new Cloud Agent on EMS_Code_SIM

Apply the horse-crush improvements from the APGAR handoff branch `cursor/horse-crush-patch-handoff-11c1` (folder `ems-code-sim-horse-apply/` or file `horse-crush-improvements.patch`). Create branch `cursor/horse-crush-improvements-11c1`, commit, push, and open a PR to main. Run `node tools/test-horse-crush-phase-plan.js` and related contract tests before finishing.
