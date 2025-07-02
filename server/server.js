// server/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import engineerRoutes from "./routes/engineers.js";
import projectRoutes from "./routes/projects.js";
import assignmentRoutes from "./routes/assignments.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Error:", err));

// Routes
app.use("/api", authRoutes);
app.use("/api/engineers", engineerRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/assignments", assignmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
