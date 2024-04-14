const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  content: { type: String, required: true },
  isSendmanAdmin: { type: Boolean, required: true },
  read: { type: Boolean, required: true },
  sendMan: { type: mongoose.Types.ObjectId, ref: "user" },
  to: { type: mongoose.Types.ObjectId, ref: "user" },
});

// date: "2023-09-07T19:11:23.214Z";
// content: "Hello little worker";
// isSendmanAdmin: true;
// read: true;
// sendman: "OfekGitam";
// to: "OfekGitam";

module.exports = mongoose.model("Message", shiftSchema);
