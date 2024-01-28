const expressAsyncHandler = require("express-async-handler");
const Community = require("../models/communitymodel");
const Member = require("../models/membermodel");

const createMember = expressAsyncHandler(async (req, res) => {
  let { community, user, role } = req.body;
  const uid = req.user.id;
  community = await Community.findOne({ id: community });
  if (community.owner === uid) {
    try {
      const member = await Member.create({
        id: Snowflake.generate(),
        community: community.id,
        user: user,
        role: role,
      });

      if (member) {
        res.status(200).send({
          status: true,
          content: {
            data: {
              id: member.id,
              community: member.community,
              user: member.user,
              role: member.role,
              created_at: member.created_at,
            },
          },
        });
      }
    } catch (error) {
      res.status(400);
      throw new Error("Member not created");
    }
  } else {
    res.status(400).send({
      status: false,
      errors: [
        {
          message: "You are not authorized to perform this action.",
          code: "NOT_ALLOWED_ACCESS",
        },
      ],
    });
  }
});

const deleteMember = expressAsyncHandler(async (req, res) => {
  const udid = req.params.id;
  const uid = req.user.id;
  const member = await Member.findOne({ id: udid });
  const community = await Community.findOne({ id: member.community });
  if (community.owner === uid) {
    const delmember = await Member.deleteOne({ id: udid });
    res.status(200).send({
      status: true,
    });
  }
});

module.exports = {
  createMember,
  deleteMember,
};
