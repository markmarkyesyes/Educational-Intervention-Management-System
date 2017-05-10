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
  console.log(req.body);
  let newWorksheet = {
    Subject: req.body.Subject,
    problem_ID: req.body.Problem_ID,
    Problem_Analysis: req.body.Problem_Analysis,
    Goal: req.body.Goal,
    Description_of_Interv_Tier_2: req.body.Description_of_Interv_Tier_2,
    Tier_2_Date_Started: req.body.Tier_2_Date_Started,
    Tier_2_Date_Ended: req.body.Tier_2_Date_Ended,
    Tier_2_Date_Completed: req.body.Tier_2_Date_Completed,
    Tier_2_minssessions: req.body.Tier_2_minssessions,
    Tier_2_SessionsWeek: req.body.Tier_2_SessionsWeek,
    Frequency_PMing: req.body.pmFrequency,
    PMing_Tool: req.body.pmIngTool
  };
  let name = req.body.student.split(" ");

  Student.update(
    {fname: name[0], lname: name[1]},
    {
      $push: {tierTwo: newWorksheet}
    }
  )
    .then(() => {
      return Student.find({fname: name[0], lname: name[1]}, {_id: 1});
    })
    .then(student => {
      console.log("got student id for pushing to faculty Array", student);
      return Faculty.update(
        {_id: req.body._id},
        {
          $push: {pmStudents: student[0]._id}
        }
      );
    })
    .then(() => {
      res.redirect("/");
    });
};

router.get("/new", onFormCreate);
router.post("/startWorksheet", saveWorksheet);

module.exports = router;
