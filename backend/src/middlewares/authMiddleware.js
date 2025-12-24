const jwt = require("jsonwebtoken");
const {user}= require("../models/User");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User notFound" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "invalid token" });
  }
};

module.exports = { protect };