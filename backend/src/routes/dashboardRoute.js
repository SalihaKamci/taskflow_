const express = require("express");
const router = express.Router();

const { getAdminDashboardStats } = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");
const {forcePasswordChangeCheck} = require("../middlewares/forcePasswordChange");

router.get("/admin",
  protect,
  isAdmin,
  forcePasswordChangeCheck,
  getAdminDashboardStats
);

module.exports = router;