const mongoose = require("mongoose");
const models = require("../models");
const Student = models.Student;

let getStudentNames = function() {
  return Student.find({}, {_id: 0, fname: 1, lname: 1}).then(sNames => {
    console.log("called");
    return (sNames = sNames.map(nameObj => {
      return `${nameObj.fname} ${nameObj.lname}`;
    }));
  });
};

module.exports = getStudentNames;
