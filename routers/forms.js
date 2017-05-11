const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const models = require("../models");
const Faculty = models.Faculty;
const Student = models.Student;
const strategies = require("../helpers/interventionStrategies");
const progressTools = require("../helpers/progressTools");
const {getFacultyInfo} = require("../helpers/getStudentNames");
const {
  interventionResult,
  dataDecision,
  interventionEffectiveness
} = require("../helpers/resultOptions");

let onFormCreate = (req, res) => {
  let data = {};
  getFacultyInfo().then(faculty => {
    data.facultyNames = faculty;
    data.student = req.query.studentName;
    data.Subject = req.query.Subject;
    data.currUser = req.user._id;
    data.interventionStrategies = strategies[data.Subject];
    data.progressTools = progressTools[data.Subject];
    switch (req.query.tier) {
      case "One":
        res.render("worksheets/tierOneWorksheet", data);
        break;
      case "Two":
        res.render("worksheets/newTierTwoWorksheet", data);
        break;
      case "Three":
        res.render("worksheets/tierThreeWorksheet", data);
        break;
      default:
        res.redirect("/");
    }
  });
};

let saveWorksheet = (req, res) => {
  let newWorksheet = {
    Subject: req.body.Subject,
    problem_ID: req.body.Problem_ID,
    Problem_Analysis: req.body.Problem_Analysis,
    Goal: req.body.Goal,
    Description_of_Interv_Tier_2: req.body.Description_of_Interv_Tier_2,
    Tier_2_Date_Started: req.body.Tier_2_Date_Started,
    Tier_2_Date_Ended: req.body.Tier_2_Date_Ended,
    Tier_2_minssessions: req.body.Tier_2_minssessions,
    Tier_2_SessionsWeek: req.body.Tier_2_SessionsWeek,
    Frequency_PMing: req.body.Frequency_PMing,
    PMing_Tool: req.body.PMingTool
  };
  //extracts the student code from the student name string
  let code = req.body.student.split(" ")[2].slice(1, -1);
  Student.update({code}, {$push: {tierTwo: newWorksheet}})
    .then(() => {
      return Student.find({code}, {_id: 1, hrTeacher: 1});
    })
    .then(student => {
      return Faculty.update(
        {
          _id: {
            $in: [req.body._id, student.hrTeacher]
          }
        },
        {
          $push: {students: student[0]._id}
        }
      );
    })
    .then(() => {
      res.redirect("/");
    });
};

router.get("/new", onFormCreate);
router.post("/saveWorksheet", saveWorksheet);

module.exports = router;
