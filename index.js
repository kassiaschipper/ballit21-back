import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

//Rota de teste
app.get("/status", (req, res) => {
  return res.send("Ok");
});


app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
