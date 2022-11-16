const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

const registerRoutes = require("./routes/register-routes");
const restoreRoutes = require("./routes/restore-routes");
const loginRoutes = require("./routes/login-routes");
const loadSavedRoutes = require("./routes/load-saved-route");
const deleteRoutes = require("./routes/delete-routes");
const saveRoutes = require("./routes/save-routes");
const User = require("./models/mongoose-model");
const { Zybriq, zybriqSchema } = require("./models/zybriqs-model");

app.use(express.static(__dirname + "/client"));

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  // console.log("rendering");
  res.render("pages/index", {
    user: req.user,
  });
});

//Listening for port.
let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started.");
});
