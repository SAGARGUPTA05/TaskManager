const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) return res.status(401).json({ message: "Access denied, token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
};

module.exports = authMiddleware;
