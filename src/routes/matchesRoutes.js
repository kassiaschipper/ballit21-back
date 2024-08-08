import { Router } from "express";
import { getMatches, insertMatch, updateMatch, getWinnersList, checkForWinners, deleteMatches, deleteTable } from "../controllers/matchesController.js";

const routerMatches = Router();
routerMatches.get("/matches", getMatches);
routerMatches.post("/match",insertMatch);
routerMatches.put("/match", updateMatch);
routerMatches.get("/winners", checkForWinners);
routerMatches.get("/winnerslist", getWinnersList);
routerMatches.delete("/matches", deleteMatches);
routerMatches.delete("/clearall", deleteTable)

export default routerMatches