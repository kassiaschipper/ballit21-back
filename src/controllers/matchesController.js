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
  return res
    .status(201)
    .send({ message: "Partida(s) cadastrada(s)", data: matches });
}

async function updateMatch(req, res) {
  const match = req.body;

  try {
    const findMatch = (await matchesRepository.getMatchById(match.matchId))
      .rows;

    if (findMatch.length > 0) {
      await matchesRepository.putMatch(match);
      let winner = (await matchesRepository.getWinnerById(match.matchId))
        .rows[0];

      return res
        .status(200)
        .send({ message: "Partida atualizada", winner: winner });
    }
    return res.status(204).send({ message: "Partida não localizada" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function checkForWinners(req, res) {

  try {
    let noWinnerList = await matchesRepository.getMatchesWithNoWinner();
    return res.status(200).send({ data: noWinnerList });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function getWinnersList(req, res) {
  try {
    let listOfWinners = (await matchesRepository.getWinners()).rows;
    return res.status(200).send({data:listOfWinners});
  }  catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function deleteMatches(req, res) {

  try {
    await matchesRepository.eraseMatchesData();
    return res.status(200).send({ message: "Dados apagados" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function deleteTable(req, res) {
 
  try {
    await matchesRepository.eraseMatchesData();
    await matchesRepository.deleteTeams();

    return res.status(200).send({message: "Dados limpos"});
  } catch (error) {
    return res.sendStatus(500);
  }
}

export {
  getMatches,
  insertMatch,
  updateMatch,
  checkForWinners,
  deleteMatches,
  getWinnersList,
  deleteTable
};
