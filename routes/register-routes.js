const router = require('express').Router();
const passport = require('passport');
const session = require('express-session');
const User = require('../models/mongoose-model');
const passportLocalMongoose = require('passport-local-mongoose');
const Zybriq = require('../models/zybriqs-model');

router.get("/", (req, res) => {
  res.render("pages/register", {
    user: req.user,
    msg: "Please enter user data to register: ",
  });
});

router.get("/success", (req, res) => {
  console.log("in registerSuccess route.");

  console.log("isAuth ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.render("pages/registerSuccess");
  } else {
    res.redirect("/login");
  }
});

router.post("/", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password1 = req.body.password;
  let password2 = req.body.password_two;

  //find the username and see if they exist already.
  //If not, checks to see if the passwords match.
  //If pw's match then it registers the user and redirects.

  User.findOne({
    username: username
  }).then((foundUser) => {
    if (foundUser) {
      res.render("pages/register", {
        msg: "That user is already registered. Please choose a different user name.",
      });
    } else if (password1 !== password2) {
      res.render("pages/register", {
        msg: "Passwords must match.",
      });
    } else {
      User.register({
          username: username,
          email: email
        },
        password1,
        function (err, user) {
          if (err) {
            console.log(err);
            res.redirect("/login");
          } else {
            passport.authenticate("local")(req, res, function () {
              res.redirect("/register/success");
            });
          }
        }
      );

    } //end of else.
  }); //end of User.findOne.
}); //end app.post

module.exports = router;