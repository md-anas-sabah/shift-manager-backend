const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
  shifts: [{ type: mongoose.Types.ObjectId, ref: "Shift" }],
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

module.exports = mongoose.model("User", userSchema);
