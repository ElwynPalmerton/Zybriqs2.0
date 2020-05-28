const saveRoutes = require("express").Router();
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const User = require("../models/mongoose-model");
const chalk = require("chalk");
const passportLocalMongoose = require("passport-local-mongoose");
const {
  Zybriq,
  zybriqsSchema
} = require("../models/zybriqs-model");

let tempState;
let exists;

// Initial route
// for saving Zybriqs 's.
// //Front-end sends the Zybriq data here with the $.post.
saveRoutes.post("/", (req, res) => {
  //tempState is a global variable which
  //is assigned here so that it can be accessed in
  //app.post(/saveZibriq);
  tempState = req.body.state;
  //This just sends a success message.
  //The get /saveName route is handling the naming.
  res.send({
    message: "Success",
  });
});

///Save over existing Zybriq.
saveRoutes.get("/saveOver", (req, res) => {
  let zibNames = [];
  let zibIds = [];

  for (let zib of req.user.Zybriqs) {
    zibNames.push(zib.name);
    zibIds.push(zib._id);
  }

  res.render("pages/saveOver", {
    zibNames: zibNames,
    zibIds: zibIds,
  });
});

saveRoutes.post("/saveOver", (req, res) => {
  console.log("Replace ZybId: ", req.body.zName);
  console.log("User id", req.user.id);
  let zybID = req.body.zName;

  // const tempZ = new Zybriq({
  //   name: zybID,
  //   state: tempState,
  // });

  // tempZ.save();

  let username = req.user.username;

  Zybriq.findOne({
    _id: zybID,
  }).then((zyb) => {
    console.log(zyb);
    zyb.state = tempState;
    zyb.save().then((savedZyb) => {
      console.log("Saved Zyb: ", savedZyb);
      res.render("pages/saveSuccess.ejs", {
        message: "Success",
        id: savedZyb.id,
      });
    });
  });
});

//The save button calls the submitData() function in
//saveState.js which then uses Window.location.assign('/saveName');
//Called from submitData() with assign();
saveRoutes.get("/", (req, res) => {
  //console.log("in get saveName");
  if (req.isAuthenticated()) {
    //CHeck this here and created redirect to Delete a Zybriqs.
    //Or let them replace a Zybriq.
    if (req.user.Zybriqs.length > 5) {
      console.log(req.user.username);
      res.redirect("/saveName/saveOver");
      res.end();
    } else {
      let msg;
      msg = "Please name your Zybriq";
      if (exists === true) {
        msg = "That Zybriq already exists.";
        exists = false;
      } //This is probably a terrible
      res.render("pages/saveName", {
        message: msg,
      });
    }
  } else {
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
  exists = false;

  User.find({
    $and: [{
        username: req.user.username,
      },
      {
        Zybriqs: {
          $elemMatch: {
            name: zName,
          },
        },
      },
    ],
  }).then((foundZyb) => {
    if (foundZyb.length !== 0) {
      res.redirect("/saveName");
      exists = true;
    } else {
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

      //
    }
  });
  //
  //Console.log the user out here.
});

saveRoutes.get('/delete', (req, res) => {
  //Check authentication, elso go to login.
  //Create the ZibIDs and ZibNames arrays.
  //Create the post route and log the result to the console.
  if (req.isAuthenticated()) {
    let zibNames = [];
    let zibIds = [];

    for (let zib of req.user.Zybriqs) {
      zibNames.push(zib.name);
      zibIds.push(zib._id);
    }
    res.render("pages/delete", {
      zibNames: zibNames,
      zibIds: zibIds,
    });
  } else {
    res.render("pages/login", {
      msg: "You must be logged in to save your Zybriqs.",
      cameFrom: "deleteRoute",
      //Don't forget to change this to delete route.
    });
  }
});


saveRoutes.post('/delete', (req, res) => {
  //This is an array of zyb Id's.
  let itemsToBeDeleted = [];
  let deleteArray = req.body.zName;

  //req.body.name delivers a string if it is one element and an array if it is not.
  if (typeof deleteArray === 'object') {
    itemsToBeDeleted = deleteArray;
  } else if (typeof deleteArray === 'string') {
    itemsToBeDeleted.push(deleteArray);
  };



  console.log(req.user.username);

  console.log(req.user.Zybriqs);

  itemsToBeDeleted.forEach(item => {

    req.user.Zybriqs.pull(item);
    req.user.save();

    Zybriq.findByIdAndDelete(item)
      .then(result => {
        console.log("Deleted: ", result);
      }).catch(err => {
        console.log("err ", err);
      });

  });

  res.redirect('/');


})




module.exports = {
  saveRoutes,
  tempState,
};