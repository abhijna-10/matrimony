const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, gender, dob, mobile, religion, marital_status } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      gender,
      dob,
      mobile,
      religion,
      marital_status
    });

    await user.save();
    res.status(201).json({ msg: 'User registered', user });
  } catch (err) {
    res.status(500).json({ msg: 'Error', error: err.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    res.status(200).json({ msg: "Login successful", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


module.exports = router;
