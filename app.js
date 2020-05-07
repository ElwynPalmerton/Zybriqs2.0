const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + "/client"));


mongoose.connect('mongodb://localhost:27017/zybriqsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var zybriqsSchema = new mongoose.Schema({
  name: String,
  state: String,
});

var Zybriq = mongoose.model('zybriq', zybriqsSchema);



app.get("/loadState", (req, res) => {
  console.log('hello');
  Zybriq.findOne({
      name: "Zybriqs5"
    })
    .then(foundZybriq => {
      console.log(foundZybriq.state);
      res.send(foundZybriq.state);
    })
    .catch(err => {
      console.log(err);
    }) //end of findOne.


}); //End of /loadState.

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.post("/", (req, res) => {
  console.log("Posted");
  console.log("name:", req.body.name);
  console.log("state", req.body.state);
  //const newZybriq = new zybriq({name: req.body.name, state: req.body.state})

  let zybriqOne = new Zybriq({
    name: req.body.name,
    state: req.body.state,
  })

  zybriqOne.save();

  res.send("Saved your Zybriq");
});

app.listen(3000, console.log("Running server on port 3000"));