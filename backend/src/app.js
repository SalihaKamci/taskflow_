const express = require("express");
const cors = require("cors");
const app = express();
 
app.use(cors());
app.use(express.json());

const authRoutes= require("./routes/authRoute");
app.use("/api/auth",authRoutes);

const { protect } = require("./middlewares/authMiddleware");
app.get("/api/test/protected", protect, (req, res) => {
  res.json({
    message: "Protected route test",
    user: req.user,
  });
});

const {forcePasswordChangeCheck} = require("./middlewares/forcePasswordChange")
app.get(
  "/api/dashboard",
  protect,
  forcePasswordChangeCheck,
  (req, res) => {
    res.json({ message: "Dashboard erişimi başarılı" });
  } );
 const userRoutes = require("./routes/userRoute");
app.use("/api/users", userRoutes);
  const projectRoutes = require("./routes/projectRoute");
app.use("/api/projects", projectRoutes);

const taskRoutes = require("./routes/taskRoute");
app.use("/api/tasks", taskRoutes);
const employeeRoutes = require("./routes/employeeRoute");
app.use("/api/employees", employeeRoutes);

const dashboardRoutes = require("./routes/dashboardRoute");

app.use("/api/dashboard", dashboardRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "API running" });
});



module.exports = app;