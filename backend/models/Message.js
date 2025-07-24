const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
