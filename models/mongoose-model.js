const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');



//User schema.
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);

module.exports = User;