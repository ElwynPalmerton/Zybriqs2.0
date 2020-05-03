const express = require("express");

const app = express();


app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(3000, console.log("Running server on port 3000"));