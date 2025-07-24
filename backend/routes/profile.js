const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Create Profile
router.post('/', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json({ msg: 'Profile created', profile });
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

// Get Profile by User ID
router.get('/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user_id: req.params.user_id });
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

module.exports = router;
