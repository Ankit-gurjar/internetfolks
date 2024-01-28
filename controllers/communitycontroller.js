const expressAsyncHandler = require("express-async-handler");
const Community = require("../models/communitymodel");
const Member = require("../models/membermodel");
const { Snowflake } = require("@theinternetfolks/snowflake");

const getslug = function (title) {
  var a = title.split(" ");
  var b = a.join("-");
  var c = b.toLowerCase();
  return c;
};

const createCommunity = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const uid = req.user.id;

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

  const slug = getslug(name);

  const community = await Community.create({
    id: Snowflake.generate(),
    name: name,
    slug: slug,
    owner: uid,
  });

  if (community) {
    res.status(200).json({
      status: true,
      content: {
        data: {
          id: community.id,
          name: community.name,
          slug: community.slug,
          owner: community.owner,
          created_at: community.created_at,
          updated_at: community.updated_at,
        },
      },
    });
  } else {
    res.status(400).json({
      status: false,
      error: "Unable to create community",
    });
  }
});

const getallCommunity = expressAsyncHandler(async (req, res) => {
  const page_no = parseInt(req.query.page);
  const limit = parseInt(10);
  try {
    let content = await Community.aggregate([
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

const getallMembers = expressAsyncHandler(async (req, res) => {
  const page_no = parseInt(req.query.page);
  const limit = parseInt(10);
  const name = req.query.search;
  console.log(req);

  const community = await Community.findOne({ name: name });
  const uid = community.id;
  console.log(req);
  try {
    let content = await Member.aggregate([
      {
        $match: { community: uid },
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

const myCommunity = expressAsyncHandler(async (req, res) => {
  const page_no = parseInt(req.query.page);
  const limit = parseInt(10);
  const uid = req.user.id;
  try {
    let content = await Community.aggregate([
      {
        $match: { owner: uid },
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

const measMember = expressAsyncHandler(async (req, res) => {
  const page_no = parseInt(req.query.page);
  const limit = parseInt(10);
  const uid = req.user.id;
  try {
    let content = await Member.aggregate([
      {
        $match: { user: uid },
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

module.exports = {
  createCommunity,
  getallCommunity,
  getallMembers,
  myCommunity,
  measMember,
};
