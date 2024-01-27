const express = require("express");
const { createRole, getallRole } = require("../controllers/rolecontroller");
const router = express.Router();

router.route("/").post(createRole).get(getallRole);

module.exports = router;
