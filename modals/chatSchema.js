const mongoose = require("mongoose");

const chatScheema = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  data: { type: String, trim: true },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
  readBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const message = mongoose.model("Message", chatScheema);
module.exports = message;
