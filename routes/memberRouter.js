const express = require("express");
const {
  createMember,
  deleteMember,
} = require("../controllers/membercontroller");

const router = express.Router();

router.route("/").post(createMember);
router.route("/:id").delete(deleteMember);

module.exports = router;
