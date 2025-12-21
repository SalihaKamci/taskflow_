const express = require("express");
const router = express.Router();
const { createTask, updateTaskStatusByEmployee,getAllTasks,} = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.post("/", protect, isAdmin, createTask);
router.get("/", protect, getAllTasks);

router.patch("/:id/status",
  protect,
  updateTaskStatusByEmployee
);

module.exports = router;