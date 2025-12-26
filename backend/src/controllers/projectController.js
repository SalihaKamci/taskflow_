const { Project } = require("../models");

const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;

    if (new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "date discrepancy" });
    }
    const adminId = req.user.id;
    const project = await Project.create({
      name,
      description,
      startDate,
      endDate,
      status,
      adminId: req.user.id,
      createdBy: req.user.id
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Project creation error", error });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Projects not loaded", error });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate, status } = req.body;

    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "date discrepancy" });
    }

    await project.update({
      name,
      description,
      startDate,
      endDate,
      status,
      
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Project update error", error });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
};