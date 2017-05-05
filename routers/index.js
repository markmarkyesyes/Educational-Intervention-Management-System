const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");
const models = require("../models");
const Faculty = models.Faculty;
const passport = require("passport");
const {populateDashboard} = require("../services/db/getStudents");

////
//Passport Strategy
////
const {local} = require("../strategy/local");
passport.use(local);

//Temporary user object method for db queries
let tempUser = () => {
  return Faculty.findOne({email: "foo@bar.com"}).then(tempUser => {
    return tempUser;
  });
};

////
//Routes
////
let onIndex = (req, res) => {
  tempUser().then(user => {
    populateDashboard(user._id).then(dashboard => {
      // console.log("hello", JSON.stringify(dashboard, null, 2));
      if (!req.user) {
        res.render("home", {dashboard, user});
      } else {
        res.redirect("/login");
      }
    });
  });
};

let onUnauthenticatedVisit = (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

let onLogout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

router.get("/", onIndex);
router.get("/login", onUnauthenticatedVisit);
router.get("/logout", onLogout);
router.post(
  "/login",
  passport.authenticate("local", {failureRedirect: "/login"}),
  function(req, res) {
    res.redirect("/");
  }
);

module.exports = router;
