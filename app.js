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
//Local Strategy
////
const LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(
    {passReqToCallback: true},
    function(req, username, password, done) {
      Faculty.findOne({email: username}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user || !user.validatePassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

////
//Passport Sessions
////
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  Faculty.findById(id, function(err, user) {
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
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: "Nope!"
  })
);

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
