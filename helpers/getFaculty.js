const mongoose = require("mongoose");
const models = require("../models");
const Faculty = models.Faculty;

let getFaculty = function() {
  return Faculty.find({}, { _id: 0, fname: 1, lname: 1 }).then(fNames => {
    return (fNames = fNames.map(nameObj => {
      return `${nameObj.fname} ${nameObj.lname}`;
    }));
  });
};

module.exports = getFaculty;
