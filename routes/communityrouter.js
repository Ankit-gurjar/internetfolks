const express = require("express");
const {
  createCommunity,
  getallCommunity,
  getallMembers,
  myCommunity,
  measMember,
} = require("../controllers/communitycontroller");

const router = express.Router();

router.route("/").post(createCommunity).get(getallCommunity);
router.route("/:id/members").get(getallMembers);
router.route("/me/owner").get(myCommunity);
router.route("/me/member").get(measMember);

module.exports = router;
