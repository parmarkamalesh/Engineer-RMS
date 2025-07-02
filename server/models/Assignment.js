// server/models/Assignment.js
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  engineer: { type: mongoose.Schema.Types.ObjectId, ref: "Engineer" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  hoursAllocated: Number,
});

export default mongoose.model("Assignment", assignmentSchema);
