const mongoose = require("mongoose");
const models = require("./models");
const Faculty = models.Faculty;

mongoose.connect("mongodb://localhost/psd150-interventions-development");

Faculty.remove({}, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log("collection removed");
    Faculty.create({
      fname: "Mark",
      lname: "Foo",
      email: "foo@bar.com",
      password: "Foo", //,(Hash with Bcrypt/passport)
      gradesTaught: [1, 2, 3],
      notes: ["Foo", "Bar"],
      pmStudents: {
        tierOneStudents: [null],
        tierTwoStudents: [null],
        tierThreeStudents: [null],
        tierOneIntegrityForms: [null],
        tierTwoIntegrityForms: [null],
        tierThreeIntegrityForms: [null]
      },
      interventionStudents: {
        tierOneStudents: [null],
        tierTwoStudents: [null],
        tierThreeStudents: [null],
        tierOneIntegrityForms: [null],
        tierTwoIntegrityForms: [null],
        tierThreeIntegrityForms: [null]
      }
    })
      .then(() => {
        console.log("created one faculty member");
      })
      .catch(err => {
        console.log("failed!", err);
      });
  }
});
