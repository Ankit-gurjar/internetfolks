const expressAsyncHandler = require("express-async-handler");
const Role = require("../models/rolemodel");
const { Snowflake } = require("@theinternetfolks/snowflake");

const createRole = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name || name.lenght < 2) {
    res.status(400).json({
      status: false,
      errors: [
        {
          param: "name",
          message: "Name should be at least 2 characters.",
          code: "INVALID_INPUT",
        },
      ],
    });
    return;
  }

  const roleexit = await Role.findOne({ name: name });

  if (roleexit) {
    res.status(400);
    throw new Error("Role Exist");
  }

  const role = await Role.create({
    id: Snowflake.generate(),
    name: name,
  });

  if (role) {
    res.status(200).json({
      status: true,
      content: {
        data: {
          id: role.id,
          name: role.name,
          created_at: role.created_at,
          updated_at: role.updated_at,
        },
      },
    });
  } else {
    res.sendStatus(400);
    throw new Error("Failed to create Role");
  }
});

const getallRole = expressAsyncHandler(async (req, res) => {
  try {
    const data = await Role.find().limit(10);
    res.status(200).json({
      status: true,
      content: {
        meta: {
          total: 2,
          pages: 1,
          page: 1,
        },
        data,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error("Failed to load data");
  }
});

module.exports = { createRole, getallRole };
