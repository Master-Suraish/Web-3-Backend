import { Router } from "express";
import { getAllDevelopers, getByDevId } from "../controllers/dev.controllers";

const route = Router();

route.get("/developers", getAllDevelopers);
route.get("/developer/:id", getByDevId);

export default route;
