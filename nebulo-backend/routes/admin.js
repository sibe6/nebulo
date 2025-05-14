const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const PendingUser = require('../models/PendingUser');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

router.get('/pendingUsers', authMiddleware, requireRole(['admin']), async (req, res) => {
  try {
    const pendingUsers = await PendingUser.find({ approved: false });
    res.status(200).json(pendingUsers);
  } catch (err) {
    console.error('Failed to fetch pending users:', err);
    res.status(500).json({ error: 'Failed to fetch pending users' });
  }
});

router.post('/approveUser/:id', authMiddleware, requireRole(['admin']), async (req, res) => {
  const { id } = req.params;

  try {
    const pendingUser = await PendingUser.findById(id);
    if (!pendingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = new User({
      username: pendingUser.username,
      password: pendingUser.password,
      role: pendingUser.role,
    });

    await user.save({ validateBeforeSave: false });

    await PendingUser.findByIdAndDelete(id);

    res.status(200).json({ message: 'User approved successfully' });
  } catch (err) {
    console.error('Failed to approve user:', err);
    res.status(500).json({ error: 'Failed to approve user' });
  }
});

router.delete('/disapproveUser/:id', authMiddleware, requireRole(['admin']), async (req, res) => {
  const { id } = req.params;

  try {
    const pendingUser = await PendingUser.findById(id);
    if (!pendingUser) {
      return res.status(404).json({ error: 'Pending user not found' });
    }

    await PendingUser.findByIdAndDelete(id);
    res.status(200).json({ message: 'User disapproved successfully' });
  } catch (err) {
    console.error('Failed to disapprove user:', err);
    res.status(500).json({ error: 'Failed to disapprove user' });
  }
});

router.get('/allUsers', authMiddleware, requireRole(['admin']), async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error('Failed to fetch all users:', err);
    res.status(500).json({ error: 'Failed to fetch all users' });
  }
});

module.exports = router;