#!/usr/bin/env bash
set -euo pipefail
# Run from EMS_Code_SIM repo root:
#   bash /path/to/ems-code-sim-horse-apply/APPLY.sh
ROOT="$(cd "$(dirname "$0")" && pwd)"
DEST="${1:-.}"
cd "$DEST"
test -f vitals/scenario-definitions.js || { echo "Run this from EMS_Code_SIM root (or pass it as arg 1)"; exit 1; }
rsync -a --exclude APPLY.sh --exclude README.md --exclude horse-crush-improvements.patch "$ROOT"/ ./
echo "Files applied. Verify with:"
echo "  node tools/test-horse-crush-phase-plan.js"
echo "  node tools/test-scenario-phases.js"
echo "  node tools/test-scenario-definitions.js"
