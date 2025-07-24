const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  dob: Date,
  mobile: String,
  religion: String,
  marital_status: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
