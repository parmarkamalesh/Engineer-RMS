// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // "admin", "manager", "engineer"
});

export default mongoose.model("User", userSchema);
