const express = require('express');
const router = express.Router();
const PartnerPref = require('../models/PartnerPref');

// Set Partner Preference
router.post('/', async (req, res) => {
  try {
    const pref = new PartnerPref(req.body);
    await pref.save();
    res.status(201).json({ msg: 'Preference saved', pref });
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

// Get Preference by User ID
router.get('/:user_id', async (req, res) => {
  try {
    const pref = await PartnerPref.findOne({ sender_id: req.params.user_id });
    if (!pref) return res.status(404).json({ msg: 'Preference not found' });
    res.json(pref);
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

module.exports = router;
