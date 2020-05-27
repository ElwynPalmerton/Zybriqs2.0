const saveRoutes = require('express').Router();
const passport = require('passport');
const User = require('../models/mongoose-model');
const passportLocalMongoose = require('passport-local-mongoose');
const {
  Zybriq,
  zybriqsSchema
} = require('../models/zybriqs-model');

let tempState;

// Initial route
// for saving Zybriqs 's.
// //Front-end sends the Zybriq data here with the $.post.
saveRoutes.post("/", (req, res) => {
  //tempState is a global variable which
  //is assigned here so that it can be accessed in
  //app.post(/saveZibriq);
  tempState = req.body.state;
  console.log("tempSate in post saveName: ", tempState)
  //This just sends a success message.
  //The get /saveName route is handling the naming.
  res.send({
    message: "Success",
  });
});

//The save button calls the submitData() function in
//saveState.js which then uses Window.location.assign('/saveName');
//Called from submitData() with assign();
saveRoutes.get("/", (req, res) => {
  //console.log("in get saveName");
  if (req.isAuthenticated()) {
    let msg = "Please name your Zibriq:";
    res.render("pages/saveName.ejs", {
      message: msg,
    });
  } else {
    //This should redirect?
    res.render("pages/login", {
      msg: "You must be logged in to save your Zybriqs.",
      cameFrom: "saveRoute",
    });
  }
});

//Called from the form in saveName.ejs.
//Receives the Zybriqs name and saves it to the database.
saveRoutes.post("/saveZibriq", (req, res) => {
  let zName = req.body.zName;

  //I need to check for dupes here so that the user cannot
  //save two Zybriqs with the same name.

  console.log(tempState);

  const tempZ = new Zybriq({
    name: req.body.zName,
    state: tempState,
  });

  tempZ.save();

  User.findOne({
      username: req.user.username,
    })
    .then((currentUser) => {
      currentUser.Zybriqs.push(tempZ);
      currentUser
        .save()
        .then((user) => {
          res.render("pages/saveSuccess.ejs", {
            message: "Success",
            id: tempZ.id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  //Console.log the user out here.
});

module.exports = {
  saveRoutes,
  tempState
};