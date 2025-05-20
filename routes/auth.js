// const express = require("express");
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// router.get("/verify", (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key@123");
//     res.status(200).json({ valid: true, user: decoded });
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

// module.exports = router;
const jwt = require('jsonwebtoken');
const PRIVATE_KEY = process.env.JWT_SECRET || 'secret';

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: "Token missing or invalid" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // ✅ Store decoded userId in request object
    req.userId = decoded.userId;
    next();
  });
};
