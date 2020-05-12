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


mongoose.connect('mongodb://localhost:27017/zybriqsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var zybriqsSchema = new mongoose.Schema({
  name: String,
  state: String,
});

var Zybriq = mongoose.model('zybriq', zybriqsSchema);

let tempZybriq;



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


//POST route.
//Initial route for saving Zybriqs's.
app.post("/saveName", (req, res) => {
  console.log("Posted");
  console.log("name:", req.body.name);
  console.log("state", req.body.state);

  //const newZybriq = new zybriq({name: req.body.name, state: req.body.state})
  //I need to check to see if the Zybriqs is already saved.


  tempZybriq = new Zybriq({
    name: req.body.name,
    state: req.body.state,
  })

  //tempZybriq.save();

  let msg = "Please save your Zybriqs.";

  res.render('pages/saveName.ejs', {
    message: msg
  })




  //tempZybriq.save();
  //res.send("Saved your Zybriq");

});


// app.get('/saveName', (req, res) => {
//   console.log('in get saveName');
//   let msg = "ldksfjsdlkfj";

//   res.render('pages/saveName.ejs', {
//     message: msg
//   })
// })




app.listen(3000, console.log("Running server on port 3000"));