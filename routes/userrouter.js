const express = require("express");
const {
  createUser,
  authUser,
  userDetails,
} = require("../controllers/usercontroller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/signin").post(authUser);
router.route("/me").get(protect, userDetails);

module.exports = router;
