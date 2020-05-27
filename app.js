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
const {
  saveRoutes,
  tempState
} = require("./routes/save-routes");
const User = require("./models/mongoose-model");
const {
  Zybriq,
  zybriqSchema
} = require("./models/zybriqs-model");

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

app.use('/login', loginRoutes);


//////////////////////////////////////////
//////////////////SAVING//////////////////
//////////////////////////////////////////

app.use('/saveName', saveRoutes);

// //Initial route for saving Zybriqs's.
// //Front-end sends the Zybriq data here with the $.post.
// app.post("/saveName", (req, res) => {
//   //tempState is a global variable which
//   //is assigned here so that it can be accessed in
//   //app.post(/saveZibriq);
//   tempState = req.body.state;

//   //This just sends a success message.
//   //The get /saveName route is handling the naming.
//   res.send({
//     message: "Success",
//   });
// });

// //The save button calls the submitData() function in
// //saveState.js which then uses Window.location.assign('/saveName');
// //Called from submitData() with assign();
// app.get("/saveName", (req, res) => {
//   //console.log("in get saveName");
//   if (req.isAuthenticated()) {
//     let msg = "Please name your Zibriq:";
//     res.render("pages/saveName.ejs", {
//       message: msg,
//     });
//   } else {
//     //This should redirect?
//     res.render("pages/login", {
//       msg: "You must be logged in to save your Zybriqs.",
//       cameFrom: "saveRoute",
//     });
//   }
// });

//Called from the form in saveName.ejs.
//Receives the Zybriqs name and saves it to the database.
app.post("/saveZibriq", (req, res) => {
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

//Final save route - not used/necessary?
app.get("/saveZibriq", (req, res) => {
  //This route isn't getting used because I
  //just render the page from the saveZibriq post-route.
  res.render("pages/saveSuccess.ejs", {
    message: "Success",
  });
});

//////////////////////////////////////////////////
//////////////////////LOADING/////////////////////
//////////////////////////////////////////////////

//Gets the saved names from the database and renders them with listSaved.ejs
app.get("/loadSavedNames", (req, res) => {
  //console.log("in load Data");
  if (req.isAuthenticated()) {
    Zybriq.find({
        // name: "HelloThere",
      })
      .then((foundZybriq) => {
        // console.log(foundZybriq[1].name);
        // console.log(foundZybriq[1].state);

        let zibNames = [];
        let zibIds = [];

        for (let zib of req.user.Zybriqs) {
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
  } else {
    res.cameFrom = "loadRoute";
    res.render("pages/login", {
      msg: "You must be logged in to restore your save Zybriqses.",
      cameFrom: "loadRoute",
    });
  }
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