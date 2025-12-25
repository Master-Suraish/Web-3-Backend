import mongoose from "mongoose";
import { UserTypes } from "../types/user-types";

const userSchema = new mongoose.Schema<UserTypes>(
  {
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: String, default: "user" },
    skills: [String],
    experience: { type: Number, min: 0, max: 50 },
  },
  {
    timestamps: true,
    versionKey: false,
    
  }
);

export default mongoose.model<UserTypes>("User",userSchema);
