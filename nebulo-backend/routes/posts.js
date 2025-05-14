const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

router.post('/newPost', authMiddleware, requireRole(['user', 'admin']), async (req, res) => {
  const { content } = req.body;

  if (!content || content.length > 400) {
    return res.status(400).json({ error: 'Nice try :)' });
  }

  try {
    const post = new Post({
      userId: req.user.userId,
      username: req.user.username,
      content,
      createdAt: new Date()
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.get('/posts', authMiddleware, requireRole(['user', 'admin']), async (req, res) => {
  const { after, before } = req.query;

  try {
    let query = {};
    let sort = { createdAt: -1 };

    if (after) {

      query._id = { $gt: new mongoose.Types.ObjectId(after) };
    } else if (before) {

      query._id = { $lt: new mongoose.Types.ObjectId(before) };
      sort = { createdAt: 1 };
    }

    const posts = await Post.find(query).sort(sort).limit(20);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

module.exports = router;