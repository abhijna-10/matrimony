const mongoose = require('mongoose');
const prefSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model('PartnerPref', prefSchema);
