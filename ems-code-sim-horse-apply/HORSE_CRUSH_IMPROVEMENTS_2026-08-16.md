# Horse-Crush Scenario Improvements — 2026.08.16

## What changed
- Required horse-crush findings now match the teaching path: ABC, focused hip/leg/CSM, and core vitals.
- Progress labels no longer call auto-start “Arrival decision”; they say **On-scene arrival**.
- Encounter cues prioritize focused trauma exam before packaging/movement.
- Horse progress sync points at canonical assessment routes instead of legacy airway/breathing/perfusion pages.
- Retired parking/map-arrival CSS was removed.
- Transport form promotion works for the horse scenario generally (not desktop-only) and uses the shared 980px desktop breakpoint.

## Files
- `vitals/scenario-definitions.js`
- `vitals/scenario-phase-model.js`
- `vitals/scenario-progress-sync.js`
- `vitals/horse-crush-scenario.css`
- `vitals/horse-crush-scenario.js`
- `vitals/horse-crush-ui-fix.js`
- `vitals/horse-encounter-validation.js`
- `tools/test-horse-crush-phase-plan.js`

## Verify
```bash
node tools/test-horse-crush-phase-plan.js
node tools/test-scenario-phases.js
node tools/test-scenario-definitions.js
node tools/test-rapid-primary-assessment.js
node tools/test-scenario-deployment-contract.js
```

Open:
`/vitals/visual-patient.html?case=horse_crush&training=assessment&reset=1`
