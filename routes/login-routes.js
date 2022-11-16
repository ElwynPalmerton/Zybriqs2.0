const router = require("express").Router();
const passport = require("passport");
const session = require("express-session");
const User = require("../models/mongoose-model");
const passportLocalMongoose = require("passport-local-mongoose");
const { Zybriq, zybriqsSchema } = require("../models/zybriqs-model");

router.get("/", (req, res) => {
  res.render("pages/login", {
    user: req.user,
    msg: "",
    cameFrom: "loginRoute",
  });
});

router.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, function () {
    if (req.isAuthenticated) {
      var cameFrom = req.body.cameFrom;
      if (cameFrom === "loadRoute") {
        res.redirect("/loadSavedNames");
      } else if (cameFrom === "saveRoute") {
        res.redirect("/saveName");
      } else if (cameFrom === "deleteRoute") {
        res.redirect("/delete");
      } else {
        res.redirect("/");
      }
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
