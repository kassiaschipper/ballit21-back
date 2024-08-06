import * as matchesRepository from "../repositories/matchesRepository.js";

async function getMatches(req, res) {
  try {
    const getAll = await matchesRepository.getAllMatches();
    const matches = getAll.rows;
    res.status(200).send(matches);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function insertMatch(req, res) {
  const objects = req.body;
  console.log(objects)

  for (const match in objects) {
    const { teamA_name, teamB_name } = objects[match];

    try {
      //Procura a dupla no banco para garantir que esse jogo já não foi cadastrado
      const findPairs = (
        await matchesRepository.getPairs(teamA_name, teamB_name)
      ).rowCount;

      if (findPairs !== 0) {
        return res.status(409).send({ message: "Esse jogo já existe" });
      }
      await matchesRepository.initMatch(teamA_name, teamB_name);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  const matches = (await matchesRepository.getAllMatches()).rows;

  // let ids = [];
 
  // for (const index in getId) {
  //   const {id} = getId[index];
  //   ids.push(id);   
  // }
  return res.status(201).send({ message: "Partida(s) cadastrada(s)", data: matches });
}

export { getMatches, insertMatch };
