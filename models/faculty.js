const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FacultySchema = new Schema({
  fname: {type: String},
  lname: {type: String},
  email: {type: String, isEmail: true},
  password: {type: String}, //,(Hash with Bcrypt/passport)
  gradesTaught: [{type: Number}],
  notes: [{type: String}],
  pmStudents: {
    tierOneStudents: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierTwoStudents: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierThreeStudents: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierOneIntegrityForms: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierTwoIntegrityForms: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierThreeIntegrityForms: [
      {
        type: Schema.ObjectId,
        ref: "Student, allowNull: true"
      }
    ]
  },
  interventionStudents: {
    tierOneStudents: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierTwoStudents: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierThreeStudents: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierOneIntegrityForms: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierTwoIntegrityForms: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ],
    tierThreeIntegrityForms: [
      {
        type: Schema.ObjectId,
        ref: "Student",
        allowNull: true
      }
    ]
  }
});

var Faculty = mongoose.model("Faculty", FacultySchema);

module.exports = Faculty;
