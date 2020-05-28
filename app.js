require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

//routes
const registerRoutes = require("./routes/register-routes");
const restoreRoutes = require("./routes/restore-routes");
const loginRoutes = require("./routes/login-routes");
const loadSavedRoutes = require("./routes/load-saved-route");
const { saveRoutes, tempState } = require("./routes/save-routes");
const User = require("./models/mongoose-model");
const { Zybriq, zybriqSchema } = require("./models/zybriqs-model");

const app = express();

app.use(express.static(__dirname + "/client"));

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect("mongodb://localhost:27017/zybriqsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.log("Mongo connection error:", error);
  });

mongoose.set("useCreateIndex", true);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let tempZybriq; //I probably don't need this.

/////////////ROOT///////////////
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});
//register routes.
app.use("/register", registerRoutes);

app.use("/restore", restoreRoutes);

app.get("/restore", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
  //I don't know how to reference the __dirname to a differenct folder using this command or whatever it is I need to do.
});

app.use("/login", loginRoutes);

app.use("/saveName", saveRoutes);

app.use("/loadSavedNames", loadSavedRoutes);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//This is called form listSaved.ejs after the radio button for the saved Zibriq is selected.
//Redirects to /restre?savedZib=  _ID.
app.post("/loadState", (req, res) => {
  //console.log('In /loadState');

  let savedZybriq = req.body.name;
  console.log("id: ", savedZybriq);
  //console.log("Selected Zibriq", savedZibriq);

  res.redirect("restore?savedZib=" + savedZybriq);
}); //End of /loadState.

app.listen(3000, console.log("Running server on port 3000"));
