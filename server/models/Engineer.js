// server/models/Engineer.js
import mongoose from "mongoose";

const engineerSchema = new mongoose.Schema({
  name: String,
  skills: [String],
  capacity: Number,
});

export default mongoose.model("Engineer", engineerSchema);
