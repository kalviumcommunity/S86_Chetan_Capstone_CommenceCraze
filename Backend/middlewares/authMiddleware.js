// middlewares/authMiddleware.js (Updated)
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET || "your-secret-key-here";

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized: No token" });

  jwt.verify(token, jwtSecret, {}, (err, userData) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = userData;
    
    next();
  });
}

module.exports = verifyToken;