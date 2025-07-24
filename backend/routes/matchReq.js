const express = require('express');
const router = express.Router();
const MatchReq = require('../models/MatchReq');

// Send Match Request
router.post('/', async (req, res) => {
  try {
    const match = new MatchReq(req.body);
    await match.save();
    res.status(201).json({ msg: 'Match request sent', match });
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

// Get Received Match Requests for a User
router.get('/received/:user_id', async (req, res) => {
  try {
    const requests = await MatchReq.find({ receiver_id: req.params.user_id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

// Get Sent Match Requests for a User
router.get('/sent/:user_id', async (req, res) => {
  try {
    const requests = await MatchReq.find({ sender_id: req.params.user_id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

module.exports = router;
