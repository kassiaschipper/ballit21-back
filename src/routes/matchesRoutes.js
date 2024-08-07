import { Router } from "express";
import { getMatches, insertMatch, updateMatch } from "../controllers/matchesController.js";

const routerMatches = Router();
routerMatches.get("/matches", getMatches);
routerMatches.post("/match",insertMatch);
routerMatches.put("/match", updateMatch);

export default routerMatches