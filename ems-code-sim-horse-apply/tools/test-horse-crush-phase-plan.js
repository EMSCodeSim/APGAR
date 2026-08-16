'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const window = {};
const context = { window, Date, Object, Array, String, Boolean, Number, Math };
vm.runInNewContext(fs.readFileSync(path.join(process.cwd(), 'vitals/scenario-definitions.js'), 'utf8'), context, { filename: 'vitals/scenario-definitions.js' });
vm.runInNewContext(fs.readFileSync(path.join(process.cwd(), 'vitals/scenario-phase-model.js'), 'utf8'), context, { filename: 'vitals/scenario-phase-model.js' });

const defs = window.EMSCodeSimScenarioDefinitions;
const phases = window.EMSCodeSimScenarioPhases;
assert(defs && phases, 'Horse phase dependencies must load.');

const plan = defs.PHASE_PLANS.horse_crush;
assert(plan, 'horse_crush phase plan must exist');
['airway','breathing','perfusion','pelvis_hip','left_leg','distal_csm','pulse','blood_pressure','respirations','spo2']
  .forEach(key => assert(plan.requiredFindings.includes(key), `horse_crush must require ${key}`));
assert.strictEqual(phases.labelFor('arrival_parking'), 'On-scene arrival');
assert.strictEqual(phases.classification('horse_crush', 'pelvis_hip'), 'required');
assert.strictEqual(phases.classification('horse_crush', 'pain'), 'appropriate');

const at = second => `2026-08-16T10:00:${String(second).padStart(2, '0')}.000Z`;
const finding = recordedAt => ({ value: 'Recorded', recordedAt });
const incomplete = {
  id: 'horse_crush',
  scenarioId: 'horse_crush',
  findings: {
    arrival_parking: finding(at(1)),
    airway: finding(at(2)),
    breathing: finding(at(3)),
    perfusion: finding(at(4))
  },
  treatments: [],
  reassessments: [],
  impressions: {},
  documentation: {}
};

let result = phases.evaluate(incomplete);
assert.strictEqual(result.phases.find(phase => phase.id === 'scene').label, 'On-scene arrival');
assert.strictEqual(result.phases.find(phase => phase.id === 'primary').complete, true);
assert.strictEqual(result.phases.find(phase => phase.id === 'focused').complete, false);
assert.strictEqual(result.essentialComplete, false);

const complete = {
  ...incomplete,
  findings: {
    ...incomplete.findings,
    pelvis_hip: finding(at(5)),
    left_leg: finding(at(6)),
    distal_csm: finding(at(7)),
    pulse: finding(at(8)),
    blood_pressure: finding(at(9)),
    respirations: finding(at(10)),
    spo2: finding(at(11))
  },
  treatments: [{ treatment: 'manual_leg_support', recordedAt: at(20) }],
  reassessments: [{ response: 'Distal CSM unchanged', assessment: 'distal_csm', recordedAt: at(30) }],
  impressions: { primary: 'Isolated left hip injury', action: 'Prompt trauma transport' },
  documentation: { handoff: 'MIST handoff complete', transportPriority: 'Prompt trauma transport' }
};

result = phases.evaluate(complete);
assert.strictEqual(result.phases.find(phase => phase.id === 'focused').complete, true);
assert.strictEqual(result.phases.find(phase => phase.id === 'vitals').complete, true);
assert.strictEqual(result.essentialComplete, true, 'Horse essentials should complete after ABC, focused exam, vitals, treatment, reassessment, transport, and handoff.');

const css = fs.readFileSync(path.join(process.cwd(), 'vitals/horse-crush-scenario.css'), 'utf8');
assert(!css.includes('data-horse-parking'), 'Retired parking selectors must not remain in horse CSS');
assert(!css.includes('.horse-parking-options'), 'Retired parking option styles must not remain in horse CSS');

const progressSync = fs.readFileSync(path.join(process.cwd(), 'vitals/scenario-progress-sync.js'), 'utf8');
assert(progressSync.includes('/vitals/visual-airway-assessment.html'), 'Horse progress sync must use canonical airway route');
assert(progressSync.includes('/vitals/respiratory-assessment-visual.html'), 'Horse progress sync must use canonical breathing route');
assert(progressSync.includes('/vitals/distal-csm-assessment.html'), 'Horse progress sync must use canonical distal CSM route');

console.log('Horse-crush phase plan, labels, and progress-sync checks passed.');
