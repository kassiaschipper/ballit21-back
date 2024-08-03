import * as homeRepository from "../repositories/homeRepository.js";

async function getTeams(req, res) {
  try {
    const getAll = await homeRepository.getAllTeams();
    const betList = getAll.rows;
    res.status(200).send(betList);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function insertTeams(req, res) {
  const { name, war_cry, year } = req.body;

  try {
    //Busca no banco de dados pelo nome dos times para verificar se aquele time já foi cadastrado
    const findName = await homeRepository.getName(name);
    //Vefifica de retornou uma linha na busca, em caso positivo significa que aquele time já foi cadastrado
    if (findName.rowCount === 1) {
      return res.status(200).send({ message: "Time já cadastrado" });
    }

    const insertTeam = await homeRepository.postTeam(name, war_cry, year);
    res.status(201).send({ message: "Time cadastrado" });

  } catch (error) {
    console.log(error);
    return res.sendStatus(500)
  }
}

export { getTeams, insertTeams };
