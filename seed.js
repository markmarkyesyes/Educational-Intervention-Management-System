const mongoose = require("mongoose");
const models = require("./models");
const Faculty = models.Faculty;
const Student = models.Student;

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
      .then(res => {
        console.log("created one faculty member", res);
        return Student.create({
          fname: "James",
          lname: "Baxter",
          hrTeacher: res.id,
          grade: 5,
          school: "Franklin",
          tierTwo: [
            {
              problemID: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
              problemAnalysis: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
              subject: "Reading",
              goal: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
              descriptionTierOne: [
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt"
              ],
              descriptionTierTwo: [
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt",
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt"
              ],
              startDate: Date.now(),
              endDate: Date.now(),
              completedDate: Date.now(),
              sessionsPerWeek: "3-5",
              minutesPerSession: "15-20",
              interventionistId: res._id,
              pmTools: ["Hammer", "nails", "Other"],
              pmFrequency: "3-5",
              pmFacultyId: res._id,
              notes: null,
              data: {
                regression: true,
                noChange: true,
                decreaseDiscrepancy: false,
                discontinueIntervention: true,
                fadeIntervention: true,
                modifyIntervention: true,
                continueIntervention: true,
                intensityIntervention: true,
                recycleThroughPSProcess: true,
                seekEntitlement: true,
                numStudsinInt: 5,
                numStudsDecreasedDisc: 2,
                effectivenessOfIntervention: 0
              }
            }
          ]
        });
      })
      .then(resStudent => {
        console.log("created Student", resStudent);
      })
      .catch(err => {
        console.log("failed!", err);
      });
  }
});
