const mongoose = require('mongoose');
const USchema = new mongoose.Schema({
  username: String,
  age: Number,
  followers: Number,
  location: String,
  gender: String,
});
const Model = new mongoose.model('Model', USchema);
module.exports = Model;
