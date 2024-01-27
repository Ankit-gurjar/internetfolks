const expressAsyncHandler = require("express-async-handler");

const createMember = expressAsyncHandler(async (req, res) => {});

const deleteMember = expressAsyncHandler(async (req, res) => {});

module.exports = {
  createMember,
  deleteMember,
};
