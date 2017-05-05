const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const argon2 = require("argon2");
const bcrypt = require("bcrypt");

let FacultySchema = new Schema({
  fname: {type: String},
  lname: {type: String},
  email: {type: String, isEmail: true},
  passwordHash: {type: String},
  gradesTaught: [{type: Number}],
  notes: [{type: String}],
  pmStudents: [
    {
      type: Schema.ObjectId,
      ref: "Student",
      allowNull: true
    }
  ],
  intStudents: [
    {
      type: Schema.ObjectId,
      ref: "Student",
      allowNull: true
    }
  ]
});

FacultySchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

FacultySchema.virtual("password").set(function(value) {
  this.passwordHash = bcrypt.hashSync(value, 8);
});

// FacultySchema.methods.validPassword = function(password) {
//   argon2.verify(this.password, password).then(match => {
//     if (match) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// };
//
// FacultySchema.virtual("password").set(function(value) {
//   let that = this;
//   argon2.hash(value, 8).then(hash => {
//     this.passwordHash = hash;
//     console.log(that);
//     console.log("hash created", hash);
//   });
// });

var Faculty = mongoose.model("Faculty", FacultySchema);

module.exports = Faculty;
