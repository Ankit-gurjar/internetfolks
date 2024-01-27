const express = require("express");
const {
  createCommunity,
  getallCommunity,
  getallMembers,
  myCommunity,
  measMember,
} = require("../controllers/communitycontroller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, createCommunity).get(protect, getallCommunity);
router.route("/:id/members").get(protect, getallMembers);
router.route("/me/owner").get(protect, myCommunity);
router.route("/me/member").get(protect, measMember);

module.exports = router;
