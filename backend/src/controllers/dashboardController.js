const { Project, Task, User } = require("../models");
const { Op } = require("sequelize");

const getAdminDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const endOfWeek = new Date();
    endOfWeek.setDate(today.getDate() + 7);

    const totalProjects = await Project.count();
    const totalTasks = await Task.count();
    const totalEmployees = await User.count({
      where: { role: "employee" },
    });

    const todayTasks = await Task.count({
      where: {
        dueDate: {
          [Op.between]: [today, endOfToday],
        },
        status: {
          [Op.not]: "Completed",
        },
      },
    });

    const weeklyTasks = await Task.count({
      where: {
        dueDate: {
          [Op.between]: [today, endOfWeek],
        },
        status: {
          [Op.not]: "Completed",
        },
      },
    });

 
    const overdueTasks = await Task.count({
      where: {
        dueDate: {
          [Op.lt]: today, // küçük  
        },
        status: {
          [Op.not]: "Completed",
        },
      },
    });


    const pendingTasks = await Task.count({
      where: { status: "Pending" },
    });

    const onHoldTasks = await Task.count({
      where: { status: "On Hold" },
    });

    res.json({
      totals: {
        projects: totalProjects,
        tasks: totalTasks,
        employees: totalEmployees,
      },
      todayTasks,
      weeklyTasks,
      overdueTasks,
      pendingTasks,
      onHoldTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Dashboard : data could not get",
      error: error.message,
    });
  }
};

module.exports = { getAdminDashboardStats };