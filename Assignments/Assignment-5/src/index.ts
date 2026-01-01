import express from "express";
import productRoute from "./routes/product-routes";
import dotenv from "dotenv";
import { connectingToMongoDB } from "./database/mongodb";
import productLogger from "./middlewares/product-logger";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3001;
app.use(express.json(), productLogger);

connectingToMongoDB();
app.use("/api", productRoute);

app.listen(PORT);
