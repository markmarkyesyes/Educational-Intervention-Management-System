const mongoose = require("mongoose");
const models = require("../models");
const Student = models.Student;
const Faculty = models.Faculty;

let getStudentNames = function() {
  return Student.find({}, {_id: 0, fname: 1, lname: 1}).then(sNames => {
    return (sNames = sNames.map(nameObj => {
      return `${nameObj.fname} ${nameObj.lname}`;
    }));
  });
};

let getFacultyInfo = function() {
  return Faculty.find({}, {_id: 0, fname: 1, lname: 1}).then(fNames => {
    return (fNames = fNames.map(nameObj => {
      return `${nameObj.fname} ${nameObj.lname}`;
    }));
  });
};

module.exports = {getStudentNames, getFacultyInfo};
