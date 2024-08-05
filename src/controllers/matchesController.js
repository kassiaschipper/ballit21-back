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

async function insertMatch(req,res) {
    const {teamAId, teamBId} = req.body;

    try {
        //Procura a dupla no banco para garantir que esse jogo já não foi cadastrado
        const findPairs = (await matchesRepository.getPairs(teamAId, teamBId)).rowCount;
        console.log(findPairs)
        if (findPairs !== 0){
            return res.status(409).send({message:"Esse jogo já existe"});
        } 
        
        await macthesRepository.initMatch(teamAId, teamBId);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
        
    }
    return res.status(201).send({message: "Partida cadastrada"});
}

export {getMatches, insertMatch}