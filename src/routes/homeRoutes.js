import { Router } from "express";
import { getTeams, insertTeams } from "../controllers/homeController.js";

const routerHome = Router();
routerHome.get("/registration", getTeams)
routerHome.post("/registration", insertTeams)

export default routerHome