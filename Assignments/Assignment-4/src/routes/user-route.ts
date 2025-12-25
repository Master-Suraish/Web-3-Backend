import { Router } from "express";
import {
  createNewUser,
  getAllUsers,
  getByUserId,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers";

const route = Router();

route.get("/AllUsers", getAllUsers);
route.get("/User/:id", getByUserId);
route.post("/CreateUser", createNewUser);
route.put("/UpdateUser/:id", updateUser);
route.delete("/DeleteUser/:id", deleteUser);

export default route;
