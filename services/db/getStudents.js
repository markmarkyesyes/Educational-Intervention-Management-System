const mongoose = require("mongoose");
const models = require("../../models");
const Faculty = models.Faculty;

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
    return dashboard;
  });
};
module.exports = {populateDashboard};

// -list students in database (name, grade, hrteacher, forms )
//   -only list students with forms
// -allow teacher to view or print any worksheet from the student
// -implement a new worksheet flow at the top of the page
//   -one row,
//     1. autofill student names from db
//     2. select subject
//     3. select intervention tier
//       -throw error if student has the same tier&&subject || !tier < selectedTier&&subject
//     4. click to enter the form
//       -will load students name, and predetermined info into hidden fields
//       -will serve the proper form with the conditional objects determined by subject
