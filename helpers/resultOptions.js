let interventionResult = [
  {id: "Regression", label: "Regression"},
  {id: "No_Change", label: "No Change"},
  {id: "Decrease_Discrepancy", label: "Decrease Discrepancy"}
];

let dataDecision = [
  {id: "Fade_Intervention", label: "Fade Intervention"},
  {id: "Modify_Intervention", label: "Modify Intervention"},
  {id: "Continue_Intervention", label: "Continue Intervention"},
  {id: "Intensity_Intervention", label: "Intensity Intervention"},
  {id: "Recycle_Through_PS_Process", label: "Recycle Through PS Process"},
  {id: "Seek_Entitlement", label: "Seek Entitlement"}
];

let interventionEffectiveness = [
  {id: "M_sts_In_intervention", label: "Number of Students In Intervention"},
  {
    id: "M_sts_decreased_discrepancy",
    label: "Number of Students Decreased Discrepancy"
  },
  {id: "Effectiveness_of_Intervention", label: "Effectiveness Of Intervention"}
];

module.exports = {
  interventionResult,
  dataDecision,
  interventionEffectiveness
};
