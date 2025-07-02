// server/routes/projects.js
import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post("/", async (req, res) => {
  const { name, description, deadline } = req.body;
  const proj = new Project({ name, description, deadline });
  await proj.save();
  res.json(proj);
});

export default router;
