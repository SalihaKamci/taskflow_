const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  updateProject,
} = require("../controllers/projectController");

const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.post("/", protect, isAdmin, createProject);
router.get("/", protect, isAdmin, getAllProjects);
router.put("/:id", protect, isAdmin, updateProject);

module.exports = router;