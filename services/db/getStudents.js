const mongoose = require("mongoose");
const models = require("../../models");
const Faculty = models.Faculty;
const {getStudentNames} = require("../../helpers/getStudentNames");

let getStudentsForFaculty = id => {
  return Faculty.find(id).populate("students").then(students => {
    return students;
  });
};

let populateDashboard = id => {
  let dashboard = {};
  return getStudentsForFaculty(id)
    .then(students => {
      dashboard.students = students[0].students;
      return getStudentNames();
    })
    .then(names => {
      dashboard.studentNames = names;
      return dashboard;
    });
};
module.exports = {populateDashboard};
