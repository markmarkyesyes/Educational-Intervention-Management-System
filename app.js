const app = require("express")();
require("dotenv").config();

////
//Body Parser
////
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

////
//Mongoose
////
var mongoose = require("mongoose");
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

////
//Server Listen
////
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
app.listen(port, hostname);
