const saveRoutes = require("express").Router();
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const User = require("../models/mongoose-model");
const passportLocalMongoose = require("passport-local-mongoose");
const {
  Zybriq,
  zybriqsSchema
} = require("../models/zybriqs-model");


const maxZybs = 3;

// Initial route
// for saving Zybriqs 's.
// //Front-end sends the Zybriq data here with the $.post.
saveRoutes.post("/", (req, res) => {
  req.session.state = req.body.state;
  //This just sends a success message.
  //The get /saveName route is handling the naming.
  res.send({
    message: "Success",
  });
});

///Save over existing Zybriq.
saveRoutes.get("/saveOver", (req, res) => {
  //Gets a list of all saved Zybriqs and sends it to the pages/saveOver.ejs view.
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
  //Takes the user selected/previously saves Zybriq and overwrites it with the current state.
  let zybID = req.body.zName;

  let username = req.user.username;

  Zybriq.findOne({
    _id: zybID,
  }).then((zyb) => {
    zyb.state = req.session.state;
    zyb.save().then((savedZyb) => {
      res.render("pages/saveSuccess.ejs", {
        message: "Success",
        id: savedZyb.id,
      });
    });
  });
});

saveRoutes.post('/session', (req, res) => {
  req.session.state = req.body.state;

  console.log('in session route: ', req.session.state);

  //req.session.state = req.body.state;
  //console.log(req.session.state);
  res.send('success');
  res.end();
})

saveRoutes.get('/session', (req, res) => {
  console.log("in saveName/session", req.session.state);
  let state = JSON.parse(req.session.state);
  let prettyState = JSON.stringify(state, null, 2);
  res.send(req.session.state);
})


//The save button calls the submitData() function in
//saveState.js which then uses Window.location.assign('/saveName');
//Called from submitData() with assign();
saveRoutes.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    //CHeck this here and created redirect to Delete a Zybriqs.
    //Or let them replace a Zybriq.
    if (req.user.Zybriqs.length >= maxZybs) {
      res.redirect("/saveName/saveOver");
      res.end();
    } else {
      let msg;
      msg = "Please name your Zybriq";
      if (req.session.exists === true) {
        msg = "That Zybriq already exists.";
        req.session.exists = false;
      } //This is probably a terrible
      res.render("pages/saveName", {
        user: req.user,
        message: msg,
      });
    }
  } else {
    res.render("pages/login", {
      user: req.user,
      msg: "You must be logged in to save your Zybriqs.",
      cameFrom: "saveRoute",
    });
  }
});

//Called from the form in saveName.ejs.
//Receives the Zybriqs name and saves it to the database.
saveRoutes.post("/saveZibriq", (req, res) => {
  let zName = req.body.zName;

  req.session.exists = false;

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
      req.session.exists = true;
      exists = true;
    } else {
      const tempZ = new Zybriq({
        name: req.body.zName,
        state: req.session.state,
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

module.exports = saveRoutes;