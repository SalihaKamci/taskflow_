const sequelize = require("../config/database");
const User = require("./user");
const Project = require("./project");

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Project = Project;

module.exports = db;