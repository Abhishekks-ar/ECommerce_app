const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  resetToken: String,
  resetTokenExpires: Date
});
const userData = mongoose.model("user", userSchema);
module.exports = userData;
