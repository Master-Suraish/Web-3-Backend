import express, { NextFunction, Request, Response } from "express";
import devRoutes from "./routes/dev.route";

const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/api", devRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
