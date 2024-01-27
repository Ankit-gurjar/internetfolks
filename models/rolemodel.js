const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const roleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
