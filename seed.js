const mongoose = require("mongoose");
const models = require("./models");
const Faculty = models.Faculty;
const Student = models.Student;
const faker = require("faker");
mongoose.connect("mongodb://localhost/psd150-interventions-development");

var faculty = [];
var students = [];

Faculty.remove({}, function(err) {
  if (err) {
    console.error(err);
  } else {
    Student.remove({}, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("collection removed");

        console.log("creating Faculty");
        for (let i = 0; i < 50; i++) {
          var member = new Faculty({
            fname: faker.fake("{{name.firstName}}"),
            lname: faker.fake("{{name.lastName}}"),
            email: `foo${i}@bar.com`,
            password: "Foo",
            gradesTaught: [1, 2, 3],
            notes: ["Foo", "Bar"],
            pmStudents: [],
            intStudents: []
          });
          faculty.push(member);
        }
        var facultyPromises = [];
        faculty.forEach(model => {
          facultyPromises.push(model.save());
        });
        return Promise.all(facultyPromises);
      }
    })
      .then(res => {
        console.log("created 50 faculty members", res);
        return Faculty.find({}, {_id: 1});
      })
      .then(faculty => {
        console.log("beginning students seed");
        for (let i = 0; i < 600; i++) {
          let facultyIndex = Math.floor(Math.random() * (50 - 1)) + 1;
          var student = Student({
            fname: faker.fake("{{name.firstName}}"),
            lname: faker.fake("{{name.lastName}}"),
            hrTeacher: faculty[facultyIndex - 1]._id,
            grade: 5,
            school: "Franklin",
            tierTwo: [
              {
                Problem_ID: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
                Problem_Analysis: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
                subject: "Reading",
                Goal: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
                Description_of_Interv_Tier_2: {
                  descSightWordsDrast: "on",
                  descIncWordRehrsl: "on",
                  descSixMinSol: "on"
                },
                Tier_2_Date_Started: Date.now(),
                Tier_2_Date_Ended: Date.now(),
                Tier_2_Date_Completed: Date.now(),
                Tier_2_SessionsWeek: "3-5",
                Tier_2_minssessions: "15-20",
                Tier_2_Interventionist: [faculty[facultyIndex - 1]._id],
                pmTools: {progEarlyRdng: "on", progSightWords: "on"},
                pmFrequency: "3-5",
                notes: null,
                interventionResult: {No_Change: "on"},
                dataDecision: {Fade_Intervention: "on"},
                interventionEffectiveness: {
                  numStudsinInt: 5,
                  numStudsDecreasedDisc: 2,
                  effectivenessOfIntervention: 0
                }
              }
            ]
          });
          students.push(student);
        }
        var studentPromises = [];
        students.forEach(model => {
          console.log("saving student");
          studentPromises.push(model.save());
        });
        return Promise.all(studentPromises);
      })
      .then(students => {
        console.log(students[0]);
        console.log("finsihed seeding");
      });
  }
});
