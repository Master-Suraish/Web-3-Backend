import { Document } from "mongoose";

export interface UserTypes extends Document {
  userName: string;
  email: string;
  role: string;
  skills: string[];
  experience: number;
}
