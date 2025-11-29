// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  providerId: { type: String }, // optional for local users
  provider: { type: String, required: true }, // "google", "github", or "local"
  displayName: String,
  email: { type: String, unique: true, sparse: true }, // required for local login
  password: String, // hashed password for local login
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
