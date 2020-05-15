const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/client"));

mongoose
  .connect("mongodb://localhost:27017/zybriqsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.log("Mongo connection error:", error);
  });

var zybriqsSchema = new mongoose.Schema({
  name: String,
  state: String,
});

var Zybriq = mongoose.model("zybriq", zybriqsSchema);

let tempZybriq; //I probably don't need this.
let tempState;

app.get("/loadState", (req, res) => {

  console.log("in loadState");
  Zibriq.findOne({
      name: HelloThere
    })
    .then(foundZibs => {
      console.log(foundZibs);
    })
    .catch(err => console.log(err));

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

//POST route.
//Initial route for saving Zybriqs's.
app.post("/saveName", (req, res) => {
  console.log("Posted");
  console.log("name:", req.body.name);
  console.log("state", req.body.state);

  //const newZybriq = new zybriq({name: req.body.name, state: req.body.state})
  //I need to check to see if the Zybriqs is already saved.

  // tempZybriq = new Zybriq({
  //   name: req.body.name,
  //   state: req.body.state,
  // })

  tempState = req.body.state;

  //tempZybriq.save();

  res.send({
    message: "Success",
  });

  //tempZybriq.save();
  //res.send("Saved your Zybriq");
});

app.get("/saveName", (req, res) => {
  console.log("in get saveName");
  let msg = "Please name your Zibriq:";

  res.render("pages/saveName.ejs", {
    message: msg,
  });
});

app.get("/saveZibriq", (req, res) => {
  console.log("In get save Zibriq");
  console.log(req.body.zName);
  res.render("pages/saveSuccess.ejs", {
    message: "Success",
  });
});

app.post("/saveZibriq", (req, res) => {
  console.log("in save Zybriq");
  console.log("Zibriq Name: ", req.body.zName);
  let zName = req.body.zName;

  let tempZybriq = new Zybriq({
    name: zName,
    state: tempState,
  });

  tempZybriq.save();

  console.log("temp Zibriq:", tempZybriq);
  res.render("pages/saveSuccess.ejs", {
    message: "Success",
  });
});

app.get("/loadData", (req, res) => {
  console.log("in load Data");

});

app.listen(3000, console.log("Running server on port 3000"));