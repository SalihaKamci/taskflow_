const { Task, Project, User } = require("../models");

const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      projectId,
      assignedUserId,
      dueDate,
      priority,
    } = req.body;

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: "no project" });
    }

    if (
      new Date(dueDate) <= new Date(project.startDate) ||
      new Date(dueDate) >= new Date(project.endDate)
    )
    
    {
      return res.status(400).json({
        message: "Task date discrepancy",
      });
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assignedUserId: assignedUserId || null,
      dueDate,
      priority,
      status: assignedUserId ? "Pending" : "On Hold",
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Task creation error", error });
  }
};


const updateTaskStatusByEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allStatuses = [
      "Pending",
      "In Progress",
      "Completed",
      "Blocked",
    ];

    if (!allStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "No task" });
    }

    if (task.assignedUserId !== req.user.id) {
      return res.status(403).json({ message: "task is not yours" });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Status update error", error });
  }
};


const getAllTasks = async (req, res) => {
  const { status, priority ,assignedUserId } = req.query;

  const where = {};
  if (status) where.status = status;
  if (priority) where.priority = priority;
  if (assignedUserId) where.assignedUserId = assignedUserId;

  const tasks = await Task.findAll({
    where,
    include: [
      { model: Project,  attributes: ['id', 'name']},
      { model: User, as: "assignedUser", attributes: ["id", "fullName"] },
    ],
    order: [["dueDate", "ASC"]],
  });

  res.json(tasks);
};

module.exports = {
  createTask,
  updateTaskStatusByEmployee,
  getAllTasks,
};
