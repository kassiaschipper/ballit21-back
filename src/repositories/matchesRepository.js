import { connection } from "../database/db.js";

const getAllMatches = async () => {
  return await connection.query(`SELECT * FROM "matches"`);
};

const initMatch = async (teamAId, teamBId) => {
  return await connection.query(
    `INSERT INTO "matches" ("teama_id","teamb_id") 
        VALUES ($1,$2)`,
    [teamAId, teamBId]
  );
};

const getPairs = async (teamAId, teamBId) => {
  return await connection.query(
    `SELECT * FROM "matches" WHERE ("teama_id"= $1 AND "teamb_id"= $2) OR ("teama_id"= $2 AND "teamb_id"=$1);`,
    [teamAId, teamBId]
  );
};
export { getAllMatches, initMatch, getPairs };
