import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

//Post

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      role: role || 'customer', // Default to customer if not provided
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = userDoc.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const userDoc = await User.findOne({ email });
    if (!userDoc) return res.status(404).json({ error: "User not found" });

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) return res.status(401).json({ error: "Invalid password" });

    jwt.sign(
      { email: userDoc.email, id: userDoc._id, name: userDoc.name, role: userDoc.role },
      jwtSecret,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) return res.status(500).json({ error: "Failed to generate token" });

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        const { password: _, ...userWithoutPassword } = userDoc.toObject();
        res.json({ userWithoutPassword, token });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Get Profile
router.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.json(null);

  try {
    const userData = jwt.verify(token, jwtSecret);
    const user = await User.findById(userData.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.json({ message: "Logged out successfully" });
});

export default router;


