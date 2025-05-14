const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const mongoose = require('mongoose');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

router.post('/newPost', authMiddleware, requireRole(['user', 'admin']), async (req, res) => {
  const { content } = req.body;

  if (!content || content.length > 400 || !/\S/.test(content)) {
    return res.status(400).json({ error: 'Invalid post content. Ensure it is not empty and does not exceed 400 characters.' });
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
    console.error('Failed to create post:', err);
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

router.delete('/deletePost/:postId', authMiddleware, requireRole(['user', 'admin']), async (req, res) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: 'Invalid post ID' });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (req.user.role !== 'admin' && post.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: 'Post deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting post' });
  }
});

module.exports = router;