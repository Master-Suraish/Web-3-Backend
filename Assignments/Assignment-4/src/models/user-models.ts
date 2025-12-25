import mongoose from "mongoose";
import { UserTypes } from "../types/user-types";

const userSchema = new mongoose.Schema<UserTypes>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    age: { type: Number, min: 10, max: 60 },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<UserTypes>("User", userSchema);
