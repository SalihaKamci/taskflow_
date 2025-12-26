const express = require("express");
const router = express.Router();
const {getEmployees} = require("../controllers/userController")
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.get("/employees", protect, isAdmin, getEmployees);

module.exports = router;