const router = require('express').Router();
const passport = require('passport');
const User = require('../models/mongoose-model');
const passportLocalMongoose = require('passport-local-mongoose');
const Zybriq = require('../models/zybriqs-model');

//Restores the Zybriqs to the main restore page after it has
//.. been requested by the front-end javascript.


router.post("/", (req, res) => {
  console.log("in restore state");
  console.log("zibID: ", req.body.zibID);
  let id = req.body.zibID;

  Zybriq.findOne({
      _id: id,
    })
    .then((foundZybriq) => {
      console.log(foundZybriq);
      res.send(foundZybriq.state);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;