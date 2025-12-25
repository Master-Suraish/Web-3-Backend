import express from "express";
import { connectingMongoDB } from "./database/mongoDB";
import dotenv from "dotenv";
import userRoutes from "./routes/user-route";
import productRoutes from "./routes/products-route";
import loggerMiddlerware from "./middleware/logger";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3001;
app.use(express.json(), loggerMiddlerware);
connectingMongoDB();

app.use("/api", userRoutes, productRoutes);

app.listen(PORT, () => {
  console.log("Your server is running...");
});
