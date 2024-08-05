import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import routerHome from "./src/routes/homeRoutes.js";
import routerMatches from "./src/routes/matchesRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

//Rota de teste
app.get("/status", (req, res) => {
  return res.send("Ok");
});

app.use(routerHome);
app.use(routerMatches);

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
