const express = require("express");
const {
  createCommunity,
  getallCommunity,
  getallMembers,
  myCommunity,
  measMember,
} = require("../controllers/communitycontroller");
const { protect } = require("../middleware/auth");
const { urlparse } = require("../middleware/urlparse");

const router = express.Router();

router.route("/").post(protect, createCommunity).get(protect, getallCommunity);
router.route("/:id/members").get(getallMembers);
router.route("/me/owner").get(protect, myCommunity);
router.route("/me/member").get(protect, measMember);

module.exports = router;
