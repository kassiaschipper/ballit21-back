//cliente para postgresql, para conectar e interagir com banco
//Pool é uma maneira de gerenciar varias conexões com db de forma eficiete
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

const { Pool } = pg;

const connection = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

export { connection };
