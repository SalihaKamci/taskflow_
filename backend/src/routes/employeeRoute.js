const express = require("express");
const router = express.Router();

const {
  getEmployees,
  createEmployee,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const {isAdmin} = require("../middlewares/roleMiddleware");


router.get("/", protect, isAdmin, getEmployees);
router.post("/", protect, isAdmin, createEmployee);

module.exports = router;