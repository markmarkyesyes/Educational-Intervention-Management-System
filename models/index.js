const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

var models = {};

models.Faculty = require("./faculty");
models.Student = require("./student");

module.exports = models;
