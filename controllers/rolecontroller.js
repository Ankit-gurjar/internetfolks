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
  const page_no = parseInt(req.query.page);
  const limit = parseInt(10);
  try {
    let content = await Role.aggregate([
      {
        $match: {},
      },
      {
        $facet: {
          meta: [
            {
              $count: "total",
            },
            {
              $addFields: {
                pages: { $ceil: { $divide: ["$total", limit] } },
                page: page_no,
              },
            },
          ],
          data: [
            {
              $skip: (page_no - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
    ]);

    content = content[0];
    content.meta = { ...content.meta[0] };

    res.status(200).json({
      status: true,
      content,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400);
    throw new Error("Failed to load data");
  }
});

module.exports = { createRole, getallRole };
