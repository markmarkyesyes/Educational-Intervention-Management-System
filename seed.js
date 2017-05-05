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
        for (let i = 0; i < 20; i++) {
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
        console.log("created 20 faculty members", res);
        return Faculty.find({}, {_id: 1});
      })
      .then(faculty => {
        console.log("beginning students seed");
        for (let i = 0; i < 600; i++) {
          let facultyIndex = Math.floor(Math.random() * (20 - 1)) + 1;
          var student = Student({
            fname: faker.fake("{{name.firstName}}"),
            lname: faker.fake("{{name.lastName}}"),
            hrTeacher: faculty[facultyIndex - 1]._id,
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
                interventionistId: [faculty[facultyIndex - 1]._id],
                pmTools: ["Hammer", "nails", "Other"],
                pmFrequency: "3-5",
                pmFacultyId: [faculty[facultyIndex - 1]._id],
                notes: null,
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
