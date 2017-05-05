const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const models = require("../models");
const Faculty = models.Faculty;
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

  res.render("home");
};
// { subject: 'reading',
// student: 'London Fadel',
// tier: 'Two',
// _id: '',
// problemId: 'casfdasdasdsa',
// problemAnalysis: 'asdasdasd',
// goal: 'dasdasda',
// intStrats:
// { descSightWordsDrast: 'on',
// descIncWordRehrsl: 'on',
// descSixMinSol: 'on' },
// startDate: '2017-05-12',
// endDate: '2017-05-08',
// completedDate: '2017-05-01',
// minutesPerSession: 'dasda',
// sessionsPerWeek: 'asdasd',
// interventionistName: 'asdasdasd',
// pmFacultyName: 'asdasdasda',
// pmFrequency: 'asdasdasdas',
// pmIngTool: { progEarlyRdng: 'on', progSightWords: 'on' } }

router.post("/new", loadTemplate);
router.post("/submitWorksheet", saveWorksheet);

module.exports = router;
