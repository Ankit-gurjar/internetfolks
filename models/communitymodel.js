const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const communitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "",
  },
  slug: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    ref: "User",
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

const Community = mongoose.model("Community", communitySchema);

module.exports = Community;
