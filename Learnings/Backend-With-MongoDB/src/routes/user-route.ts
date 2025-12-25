import { Router } from "express";
import {
  createNewUser,
  getAllusers,
  getByUserId,
  updateUser,
} from "../controllers/user.controllers";

const route = Router();

route.get("/getAll", getAllusers);
route.get("/get/:id", getByUserId);
route.post("/create", createNewUser);
route.put("/update/:id", updateUser);
// route.delete("/delete/:id",);

export default route;
