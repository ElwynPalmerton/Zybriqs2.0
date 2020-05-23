const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

//routes
const registerRoutes = require('./routes/register-routes');
const restoreRoutes = require('./routes/restore-routes');
const User = require('./models/mongoose-model');
const Zybriq = require('./models/zybriqs-model');

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
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false
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
let tempState;


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});
//register routes.
app.use('/register', registerRoutes);
app.use('/restore', restoreRoutes);


app.get("/restore", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.get("/login", (req, res) => {
  res.render("pages/login", {
    msg: "Please login: ",
  });
});

///////////ROOT

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "index.html"));
// });

// app.get("/restore", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "index.html"));
// });

// app.post("/restore", (req, res) => {
//   console.log("in restore state");
//   console.log("zibID: ", req.body.zibID);
//   let id = req.body.zibID;

//   Zybriq.findOne({
//       _id: id,
//     })
//     .then((foundZybriq) => {
//       console.log(foundZybriq);
//       res.send(foundZybriq.state);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//console.log("restoreState, zibID: ", req.body.params);
// });

//////////////////////SAVING/////////////////////

//POST route.
//Initial route for saving Zybriqs's.
app.post("/saveName", (req, res) => {
  //console.log("Posted");
  //console.log("name:", req.body.name);
  //console.log("state", req.body.state);

  //const newZybriq = new zybriq({name: req.body.name, state: req.body.state})
  //I need to check to see if the Zybriqs is already saved.

  tempState = req.body.state;

  //tempZybriq.save();

  res.send({
    message: "Success",
  });

  //tempZybriq.save();
  //res.send("Saved your Zybriq");
});

app.get("/saveName", (req, res) => {
  //console.log("in get saveName");
  if (req.isAuthenticated()) {
    let msg = "Please name your Zibriq:";
    res.render("pages/saveName.ejs", {
      message: msg,
    });
  } else {
    res.render("pages/login", {
      msg: "You must be logged in to save your Zybriqs.",
    });
  }
});

app.get("/saveZibriq", (req, res) => {
  //console.log("In get saveZibriq");
  //console.log(req.body.zName);
  res.render("pages/saveSuccess.ejs", {
    message: "Success",
  });
});

app.post("/saveZibriq", (req, res) => {
  //console.log("in save Zybriq");
  //console.log("Zibriq Name: ", req.body.zName);
  let zName = req.body.zName;

  let tempZybriq = new Zybriq({
    name: zName,
    state: tempState,
  });

  tempZybriq.save();

  //console.log("temp Zibriq:", tempZybriq);
  res.render("pages/saveSuccess.ejs", {
    message: "Success",
  });
});

//////////////////////LOADING////////////////////////////////

//Gets the saved names from the database and renders them with listSaved.ejs
app.get("/loadSavedNames", (req, res) => {
  //console.log("in load Data");
  Zybriq.find({
      // name: "HelloThere",
    })
    .then((foundZybriq) => {
      // console.log(foundZybriq[1].name);
      // console.log(foundZybriq[1].state);

      let zibNames = [];
      let zibIds = [];

      for (let zib of foundZybriq) {
        zibNames.push(zib.name);
        zibIds.push(zib._id);
      }

      res.render("pages/listSaved", {
        zibNames: zibNames,
        zibIds: zibIds,
      });

      //res.render
      //Create the res.render fild under l

      //res.send(foundZybriq.state);
    })
    .catch((err) => {
      console.log(err);
    }); //end of findOne.
});

//This is called form listSaved.ejs after the radio button for the saved Zibriq is selected.
//Redirects to /restre?savedZib=  _ID.
app.post("/loadState", (req, res) => {
  //console.log('In /loadState');

  let savedZibriq = req.body.name;
  //console.log("Selected Zibriq", savedZibriq);

  res.redirect("restore?savedZib=" + savedZibriq);

  // Zybriq.findOne({
  //     name: "HelloThere",
  //   })
  //   .then((foundZybriq) => {
  //     console.log(foundZybriq.state);
  //     res.send(foundZybriq.state);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   }); //end of findOne.
}); //End of /loadState.

//I don't think that this is doing anything now?
// app.post("/loadZibriq", (req, res) => {
//   console.log('In /loadZibriq');

//   let savedZibriq = req.body.name
//   console.log("Selected Zibriq", savedZibriq);

//   res.redirect('restore?savedZib=' + savedZibriq);

// }); //End of /loadState.

app.listen(3000, console.log("Running server on port 3000"));