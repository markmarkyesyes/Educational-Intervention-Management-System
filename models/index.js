const mongoose = require("mongoose");
const bluebird = require("bluebird");

mongoose.Promise = bluebird;

var models = {};

models.Faculty = require("./faculty");

module.exports = models;
