import { connection } from "../database/db.js";

const getAllTeams = async () => {
  return await connection.query(`SELECT * FROM "teams"`);
};

const getName = async (name) => {
    return await connection.query(`SELECT * FROM "teams" WHERE name = $1`,[name]);
 };

 const postTeam = async (name, war_cry,year) => {
    return await connection.query(
      `INSERT INTO "teams" (name, war_cry, year) VALUES ($1, $2,$3);`,
      [name, war_cry,year]
    );
  };
export {getAllTeams, getName, postTeam}