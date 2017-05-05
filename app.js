const app = require("express")();
require("dotenv").config();

////
//Session
////
const expressSession = require("express-session");
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
  })
);

////
//Body Parser
////
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

////
//Mongoose
////
const mongoose = require("mongoose");
const models = require("./models");
const Faculty = models.Faculty;
// mongoose.connect("mongodb://localhost/psd150-interventions-development");
app.use((req, res, next) => {
  if (mongoose.connection.readyState) {
    console.log("connected to MongoDB");
    next();
  } else {
    require("./mongo")(req).then(() => {
      console.log("connected to MongoDB");
      next();
    });
  }
});

////
//Passport
////
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

////
//Passport Sessions
////
passport.serializeUser(function(user, done) {
  console.log("passport-local: serializing");
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  console.log("passport-local: de-serializing");
  Faculty.findById(_id, function(err, user) {
    done(err, user);
  });
});

////
//Handlebars
////
const hbs = require("express-handlebars");
app.engine(
  "hbs",
  hbs({
    defaultLayout: "application",
    partialsDir: "views/partials",
    extname: ".hbs"
  })
);
app.set("view engine", "hbs");

////
//Routers
////
const indexRouter = require("./routers/index");
app.use("/", indexRouter);

const formsRouter = require("./routers/forms");
app.use("/form", formsRouter);

////
//Server Listen
////
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
app.listen(port, hostname);
