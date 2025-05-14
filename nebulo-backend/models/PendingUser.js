const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PendingUserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

PendingUserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('PendingUser', PendingUserSchema);