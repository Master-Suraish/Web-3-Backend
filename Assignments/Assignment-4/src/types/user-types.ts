import { Document } from "mongoose";

export interface UserTypes extends Document {
  name: string;
  email: string;
  password: string;
  age: number;
  role: string;
  experience: number;
}
