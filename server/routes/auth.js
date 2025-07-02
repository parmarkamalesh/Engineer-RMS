// server/routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;
  const existing = await User.findOne({ username });
  if (existing) return res.status(400).json({ message: "User exists" });

  const user = new User({ username, password, role });
  await user.save();
  res.json({ message: "User created" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token, role: user.role });
});

export default router;
