const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const models = require("../models");
const Faculty = models.Faculty;

let local = new LocalStrategy(
  {passReqToCallback: true},
  function(req, email, password, done) {
    console.log("in authentication callback");
    Faculty.findOne({email: email}, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user || !user.verifyPassword()) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
);

module.exports = {local};
