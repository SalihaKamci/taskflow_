const {User} = require("../models")

const getEmployees = async (req, res) => {
  try {
    const employees = await User.findAll({
      where: { role: "employee" },
      attributes: ["id", "fullName"],
      order: [["fullName", "ASC"]],
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Employee GET error" });
  }
};

module.exports = { getEmployees };