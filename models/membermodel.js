const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const memberSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: true,
    ref: "Community",
  },
  user: {
    type: String,
    required: true,
    ref: "User",
  },
  role: {
    type: String,
    required: true,
    ref: "Role",
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
