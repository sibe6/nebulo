const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const PendingUser = require('../models/PendingUser');
const router = express.Router();

router.post('/register', async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  username = username.toLowerCase();
  try {
    const existingPendingUser = await PendingUser.findOne({ username });
    const existingUser = await User.findOne({ username });

    if (existingPendingUser || existingUser) {
      return res.status(400).json({ error: 'Username is already in use' });
    }

    const user = new PendingUser({ username, password });
    await user.save();

    res.status(201).send("User created, await for approval");
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).send("Error: " + err.message);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    console.log("Login failed for username:", username);
    return res.status(401).send("Invalid credentials");
  }

  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign({ userId: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: '48h' });
  res.json({ token });
});

module.exports = router;