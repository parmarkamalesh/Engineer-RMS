// server/routes/engineers.js
import express from "express";
import Engineer from "../models/Engineer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const engineers = await Engineer.find();
  res.json(engineers);
});

router.post("/", async (req, res) => {
  const { name, skills, capacity } = req.body;
  const newEng = new Engineer({ name, skills, capacity });
  await newEng.save();
  res.json(newEng);
});

export default router;
