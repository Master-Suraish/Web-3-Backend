import { Router } from "express";
import {
  HardDeleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user-controllers";

const route = Router();

route.get("/Users", getAllUsers);
route.get("/User/:userId", getUser);
route.put("/User/update/:userId", updateUser);
route.delete("/User/harddelete/:userId", HardDeleteUser);

export default route;
