import express, { Request, Response } from "express";
import studentRoutes from "./routes/student.route";
import studentLogger from "./middleware/student.logger";

const app = express();
const PORT = 4000;

app.use(express.json(), studentLogger);
app.use("/api", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
