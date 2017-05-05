const express = require("express");
let router = express.Router();
const passport = require("passport");

////
//Passport Strategy
////
const l = require("../strategy/local");
passport.use(l.local);

////
//Routes
////
let onIndex = (req, res) => {
  if (!req.user) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
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
