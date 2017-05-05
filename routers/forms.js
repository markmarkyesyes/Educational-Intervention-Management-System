const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const models = require("../models");
const Faculty = models.Faculty;
const strategies = require("../helpers/interventionStrategies");
const progressDetails = require("../helpers/progressDetails");

let loadTemplate = (req, res) => {
  let data = {};
  data.student = req.body.studentName;
  data.subject = req.body.subject;
  data.tier = req.body.tier;
  data.interventionStrategies = strategies[data.subject];
  data.progressDetails = progressDetails[data.subject];
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
};

router.post("/new", loadTemplate);

module.exports = router;
