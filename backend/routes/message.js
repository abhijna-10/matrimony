const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Send Message
router.post('/', async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.status(201).json({ msg: 'Message sent', data: msg });
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

// Get Conversation between Two Users
router.get('/:sender_id/:receiver_id', async (req, res) => {
  try {
    const { sender_id, receiver_id } = req.params;
    const messages = await Message.find({
      $or: [
        { sender_id, receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

module.exports = router;
