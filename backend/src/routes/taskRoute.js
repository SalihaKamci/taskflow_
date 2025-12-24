const express = require("express");
const router = express.Router();
const { createTask, updateTaskStatusByEmployee,getAllTasks,} = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.post("/", protect, isAdmin, createTask);
router.get("/", protect,
  (req, res, next) => {
    if (req.user.role === "employee") {
      req.query.assignedUserId = req.user.id;
    }
    next();
  }, getAllTasks);

router.patch("/:id/status",
  protect,
  updateTaskStatusByEmployee
);

module.exports = router;