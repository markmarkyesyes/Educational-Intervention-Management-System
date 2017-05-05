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

let loadTemplate = (req, res) => {
  let data = {};
  console.log(req.body);
  getFacultyInfo().then(faculty => {
    console.log(faculty);
    data.interventionResult = interventionResult;
    data.dataDecision = dataDecision;
    data.interventionEffectiveness = dataDecision;
    data.facultyNames = faculty;
    data.student = req.body.studentName;
    data.subject = req.body.subject;
    data.tier = req.body.tier;
    data.currUser = req.body._id;
    data.interventionStrategies = strategies[data.subject];
    data.progressTools = progressTools[data.subject];
    switch (data.tier) {
      case "One":
        res.render("worksheets/tierOneWorksheet", data);
        break;
      case "Two":
        res.render("worksheets/tierTwoWorksheet", data);
        break;
      case "Three":
        res.render("worksheets/tierThreeWorksheet", data);
        breakt;
      default:
        res.redirect("/");
    }
  });
};

let saveWorksheet = (req, res) => {
  console.log(req.body);
  let newWorksheet = {
    subject: req.body.subject,
    problemID: req.body.problemId,
    problemAnalysis: req.body.problemAnalysis,
    goal: req.body.goal,
    descriptionTierTwo: req.body.intStrats,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    completedDate: req.body.completedDate,
    minutesPerSession: req.body.minutesPerSession,
    sessionsPerWeek: req.body.sessionsPerWeek,
    interventionistName: req.body.interventionistName,
    pmFacultyName: req.body.pmFacultyName,
    pmFrequency: req.body.pmFrequency,
    pmTools: req.body.pmIngTool
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

router.post("/new", loadTemplate);
router.post("/submitWorksheet", saveWorksheet);

module.exports = router;
