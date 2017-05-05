let interventionResult = [
  {id: "regression", label: "Regression"},
  {id: "noChange", label: "No Change"},
  {id: "decreaseDiscrepancy", label: "Decrease Discrepancy"}
];

let dataDecision = [
  {id: "fadeIntervention", label: "Fade Intervention"},
  {id: "modifyIntervention", label: "Modify Intervention"},
  {id: "continueIntervention", label: "Continue Intervention"},
  {id: "intensityIntervention", label: "Intensity Intervention"},
  {id: "recycleThroughPSProcess", label: "Recycle Through PS Process"},
  {id: "seekEntitlement", label: "Seek Entitlement"}
];

let interventionEffectiveness = [
  {id: "numStudsinInt", label: "Number of Students In Intervention"},
  {
    id: "numStudsDecreasedDisc",
    label: "Number of Students Decreased Discrepancy"
  },
  {id: "effectivenessOfIntervention", label: "Effectiveness Of Intervention"}
];

module.exports = {
  interventionResult,
  dataDecision,
  interventionEffectiveness
};
