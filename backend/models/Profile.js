const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bio: String,
  education: String,
  income: String,
  profession: String,
  location: String,
  religion: String
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
