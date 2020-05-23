const mongoose = require('mongoose');

//Zybriqs schema
var zybriqsSchema = new mongoose.Schema({
  name: String,
  state: String,
});

var Zybriq = mongoose.model("zybriq", zybriqsSchema);

module.exports = {
  Zybriq,
  zybriqsSchema
};