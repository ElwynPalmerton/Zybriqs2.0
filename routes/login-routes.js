const router = require('express').Router();
const passport = require('passport');
const User = require('../models/mongoose-model');
const passportLocalMongoose = require('passport-local-mongoose');
const {
  Zybriq,
  zybriqsSchema
} = require('../models/zybriqs-model');


router.get("/", (req, res) => {
  res.render("pages/login", {
    user: req.user,
    msg: "Login: ",
    cameFrom: "loginRoute",
  });
});

router.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        var cameFrom = req.body.cameFrom;
        if (cameFrom === "loadRoute") {
          res.redirect("/loadSavedNames");
        } else if (cameFrom === "saveRoute") {
          res.redirect("/saveName");
        } else if (cameFrom === "deleteRoute") {
          res.redirect('/delete');
        } else {
          res.redirect("/");
          //Ad a flag to the request object? and check for it here?
        }
      });
    }
  });
});

module.exports = router;