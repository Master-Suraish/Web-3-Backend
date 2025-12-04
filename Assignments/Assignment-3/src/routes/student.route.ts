import { Router } from "express";
import {
  getAllStudents,
  getByStudentId,
  createNewStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/student.controller";

const route = Router();

route.get("/students", getAllStudents);
route.get("/students/:id", getByStudentId);
route.post("/createStudent", createNewStudent);
route.put("/updateStudent/:id", updateStudent);
route.delete("/deleteStudent/:id", deleteStudent);

export default route;
