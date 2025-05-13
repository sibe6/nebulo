//const path = require('path');
//require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const { authMiddleware, requireRole } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

const mongoUri = process.env.ME_CONFIG_MONGODB_URL;
if (!mongoUri) {
  console.error("MONGO_URI is not defined in environment variables!");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);

app.get('/api/protected', authMiddleware, (req, res) => {
  res.send("Protected route access granted");
});

app.get('/admin', authMiddleware, requireRole('admin'), (req, res) => {
  res.send("Admin route access granted");
});

app.get('/api/verified', authMiddleware, requireRole('admin'), (req, res) => {
  res.send("Verified route access granted");
});

app.get('/', (req, res) => {
  res.send("Unprotected route access granted");
});

app.listen(5000, () => console.log("Server started on port 5000"));
