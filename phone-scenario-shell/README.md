# EMSCodeSim phone scenario shell

Phone-first UI layer for `EMS_Code_SIM` visual-patient scenarios (≤979px).

## Files to add in EMS_Code_SIM

- `vitals/mobile-scenario-shell.css`
- `vitals/mobile-scenario-shell.js`

## Wire into `vitals/visual-patient.html`

In `<head>` (after horse-crush CSS):

```html
<link rel="stylesheet" href="/vitals/mobile-simulator-upgrade.css?v=2026.09.20.1">
<link rel="stylesheet" href="/vitals/mobile-scenario-shell.css?v=2026.09.20.1">
```

Before `</body>` (after visual-patient.js):

```html
<script src="/vitals/mobile-simulator-upgrade.js?v=2026.09.20.1"></script>
<script src="/vitals/mobile-scenario-shell.js?v=2026.09.20.1"></script>
```

## What it does on phones

- Compact patient photo (~34dvh) so clinical content fits above the nav
- Hides End/Reset quick bar (still available in ⋮ scenario menu)
- 48–56px touch targets for bottom nav and clinical buttons
- Styles horse treatment selects for one-handed use
- Larger intro Skip / Play controls

Desktop (≥980px) is unchanged.
