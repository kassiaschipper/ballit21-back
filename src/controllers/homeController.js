import * as homeRepository from "../repositories/homeRepository.js";

//Retorna os times registardos
async function getTeams(req, res) {
  try {
    const getAll = await homeRepository.getAllTeams();
    const teams = getAll.rows;
    res.status(200).send(teams);
  } catch (error) {
    return res.sendStatus(500);
  }
}

async function insertTeams(req, res) {
  const objects = req.body;

  // Verifica se times já estão cadastrados para evitar nomes repetidos
  for (const team in objects) {
    const { name } = objects[team];
    //Busca no banco de dados pelo nome dos times para verificar se aquele time já foi cadastrado
    const findName = await homeRepository.getName(name);

    //Vefifica de retornou uma linha na busca, em caso positivo significa que aquele time já foi cadastrado
    if (findName.rowCount === 1) {
      return res.status(409).send({ message: "Time já cadastrado" });
    }
  }

  // Inserção dos times vai percorrer pela lista de objetos para cadastrar cada time
  for (const team in objects) {
    const { name, war_cry, year } = objects[team];

    try {
      await homeRepository.postTeam(name, war_cry, year);
    } catch (error) {
      console.log(error);
      console.log("erro no controller");
      return res.sendStatus(500);
    }
  }
  return res.status(201).send({ message: "Times cadastrados" });
}

//vai apagar os dados da tabela teams
async function finishChampionship(req, res) {
  try {
    await homeRepository.finishChampionship();
    return res.sendStatus(200);
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Não foi possível finalizar o campeonato " + error });
  }
}

export { getTeams, insertTeams, finishChampionship };
