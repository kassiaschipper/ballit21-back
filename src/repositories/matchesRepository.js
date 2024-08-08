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

const getIdByMatch = async (teamAName, teamBName) => {
  return await connection.query(
    `Select id FROM "matches" WHERE ("teama_name"= $1 AND "teamb_name"= $2) OR ("teama_name"= $2 AND "teamb_name"=$1);`,
    ["teamAName", "teamBName"]
  );
};

const getMatchById = async (id) => {
  return await connection.query(`SELECT * FROM "matches" WHERE id=$1;`, [id]);
};

const putMatch = async (body) => {
  return await connection.query(
    `UPDATE "matches" SET 
      "teama_blot" = $1, 
      "teama_plif" = $2, 
      "teama_punishment" = $3, 
      "teamb_blot" = $4, 
      "teamb_plif" = $5, 
      "teamb_punishment" = $6, 
      "winner" = $7 
    WHERE id = $8;`,
    [
      body.teama_blot,
      body.teama_plif,
      body.teama_punishment,
      body.teamb_blot,
      body.teamb_plif,
      body.teamb_punishment,
      body.winner,
      body.matchId,
    ]
  );
};

const getWinnerById = async (id) => {
  return await connection.query(`SELECT winner FROM matches WHERE id = $1;`, [
    id,
  ]);
};

const getMatchesWithNoWinner = async () => {
  let result = await connection.query(
    `SELECT * FROM "matches" WHERE "winner" IS NULL`
  );
  return result.rowCount;
};

const eraseMatchesData = async () => {
  let result = await connection.query(`DELETE FROM "matches"`);
  return result;
};

const getWinners = async () => {
  let result = await connection.query(`SELECT winner FROM "matches"`);
  return result
};

const deleteTeams = async() => {
  return await connection.query(`DELETE FROM "teams"`);
};

export {
  getAllMatches,
  initMatch,
  getPairs,
  getIdByMatch,
  getMatchById,
  putMatch,
  getWinnerById,
  getMatchesWithNoWinner,
  eraseMatchesData,
  getWinners,
  deleteTeams
};
