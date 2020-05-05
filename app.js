const express = require("express");

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.post("/", (req, res) => {
  console.log("Posted");
  console.log(req.body.data);
  res.send('hello');
});

app.listen(3000, console.log("Running server on port 3000"));