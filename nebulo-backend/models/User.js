const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const isAlreadyHashed = /^\$2[aby]\$/.test(this.password);
    if (!isAlreadyHashed) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
  next();
});

module.exports = mongoose.model('User', UserSchema);