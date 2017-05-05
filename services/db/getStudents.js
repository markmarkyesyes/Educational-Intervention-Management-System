const mongoose = require("mongoose");
const models = require("../../models");
const Faculty = models.Faculty;
const {getStudentNames} = require("../../helpers/getStudentNames");

let getStudentsForFaculty = id => {
  return Faculty.find(id)
    .populate("pmStudents")
    .populate("intStudents")
    .then(pmStudents => {
      return pmStudents;
    });
};

let populateDashboard = id => {
  let dashboard = {};
  return getStudentsForFaculty(id).then(students => {
    dashboard.intStudents = students[0].intStudents;
    dashboard.pmStudents = students[0].pmStudents;
    getStudentNames().then(names => {
      dashboard.studentNames = names;
    });
    return dashboard;
  });
};
module.exports = {populateDashboard};
