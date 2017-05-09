const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let StudentSchema = new Schema({
  fname: {type: String},
  lname: {type: String},
  hrTeacher: {type: Schema.ObjectId, ref: "Faculty", allowNull: false},
  grade: {type: Number},
  school: {type: String},
  tierTwo: [
    {
      Problem_ID: {type: String},
      Problem_Analysis: {type: String},
      Subject: {type: String},
      Goal: {type: String},
      Description_of_Interv_Tier_1: {type: Object},
      Description_of_Interv_Tier_2: {type: Object},
      Tier_2_Date_Started: {type: Date},
      Tier_2_Date_Ended: {type: Date},
      Tier_2_Date_Completed: {type: Date},
      Tier_2_SessionsWeek: {type: String},
      Tier_2_minssessions: {type: String},
      Tier_2_Interventionist: {type: String},
      PMing_Tool: {type: Object},
      Frequency_PMing: {type: String},
      notes: {type: String},
      interventionResult: {type: Object},
      dataDecision: {type: Object},
      interventionEffectiveness: {type: Object}
    }
  ]
});

var Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
