import { Router } from "express";
import { getMatches, insertMatch } from "../controllers/matchesController.js";

const routerMatches = Router();
routerMatches.get("/matches", getMatches)
routerMatches.post("/match",insertMatch)

export default routerMatches