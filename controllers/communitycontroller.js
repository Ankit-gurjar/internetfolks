const expressAsyncHandler = require("express-async-handler");

const createCommunity = expressAsyncHandler(async (req, res) => {});

const getallCommunity = expressAsyncHandler(async (req, res) => {});

const getallMembers = expressAsyncHandler(async (req, res) => {});

const myCommunity = expressAsyncHandler(async (req, res) => {});

const measMember = expressAsyncHandler(async (req, res) => {});

module.exports = {
  createCommunity,
  getallCommunity,
  getallMembers,
  myCommunity,
  measMember,
};
