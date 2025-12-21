const express = require("express");
const router = express.Router();

const { getAdminDashboardStats ,getEmployeeDashboardStats} = require("../controllers/dashboardController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");
const {forcePasswordChangeCheck} = require("../middlewares/forcePasswordChange");

router.get("/admin",
  protect,
  isAdmin,
  forcePasswordChangeCheck,
  getAdminDashboardStats
);
router.get(
  "/employee",
  protect,
  forcePasswordChangeCheck,
  getEmployeeDashboardStats
);

module.exports = router;