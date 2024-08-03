import { Router } from "express";
import { getTeams, insertTeams, finishChampionship } from "../controllers/homeController.js";

const routerHome = Router();
routerHome.get("/registration", getTeams)
routerHome.post("/registration", insertTeams)
routerHome.delete("/finish_championship", finishChampionship)

export default routerHome