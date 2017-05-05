const express = require("express");
let router = express.Router();

let onIndex = (req, res) => {
  if (req.user) {
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

let onLogin = (req, res) => {};

router.get("/", onIndex);
router.get("/login", onUnauthenticatedVisit);

router.post("/login", onLogin);

module.exports = router;
