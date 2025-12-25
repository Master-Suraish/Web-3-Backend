import express from "express";
import { connectingMongoDB } from "./db/mongodb";
import dotenv from "dotenv";
import userRoutes from "./routes/user-route";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;
app.use(express.json());

connectingMongoDB();

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Your server is running...");
});
