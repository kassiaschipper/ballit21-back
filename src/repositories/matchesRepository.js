import { connection } from "../database/db.js";

const getAllMatches = async () => {
  return await connection.query(`SELECT * FROM "matches"`);
};

const initMatch = async (teamAName, teamBName) => {
  return await connection.query(
    `INSERT INTO "matches" ("teama_name","teamb_name") 
        VALUES ($1,$2)`,
    [teamAName, teamBName]
  );
};

const getPairs = async (teamAName, teamBName) => {
  return await connection.query(
    `SELECT * FROM "matches" WHERE ("teama_name"= $1 AND "teamb_name"= $2) OR ("teama_name"= $2 AND "teamb_name"=$1);`,
    [teamAName, teamBName]
  );
};

const getIdByMatch = async(teamAName, teamBName) => {
    return await connection.query(`Select id FROM "matches" WHERE ("teama_name"= $1 AND "teamb_name"= $2) OR ("teama_name"= $2 AND "teamb_name"=$1);`,
    ["teamAName", "teamBName"]
  );
};
export { getAllMatches, initMatch, getPairs, getIdByMatch };
