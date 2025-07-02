// server/routes/assignments.js
import express from "express";
import Assignment from "../models/Assignment.js";
import Engineer from "../models/Engineer.js";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const assignments = await Assignment.find()
    .populate("engineer")
    .populate("project");
  res.json(assignments);
});

router.post("/", async (req, res) => {
  const { engineer, project, hoursAllocated } = req.body;
  const assignment = new Assignment({ engineer, project, hoursAllocated });
  await assignment.save();
  res.json(assignment);
});

export default router;
