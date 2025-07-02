import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Project from "./models/Project.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

const engineerSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  capacity: Number,
});

const Engineer = mongoose.model("Engineer", engineerSchema);

app.get("/api/engineers", async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.json(engineers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch engineers" });
  }
});

app.post("/api/engineers", async (req, res) => {
  try {
    const { name, skills, capacity } = req.body;
    const newEngineer = new Engineer({
      name,
      skills: skills.map((s) => s.trim()),
      capacity: parseInt(capacity),
    });
    await newEngineer.save();
    res.json(newEngineer);
  } catch (err) {
    res.status(400).json({ error: "Failed to add engineer" });
  }
});

// Update engineer (PUT)
app.put("/api/engineers/:id", async (req, res) => {
  try {
    const updated = await Engineer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Engineer not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete engineer (DELETE)
app.delete("/api/engineers/:id", async (req, res) => {
  try {
    const deleted = await Engineer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Engineer not found" });
    res.json({ message: "Engineer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
