# Ball IT #21

Esse é back-end  novo gerenciador do campeonato mais esquisito!

## Configuração

Siga as instruções abaixo para configurar e executar a aplicação localmente.

O back-end deve rodar simultaneamente com o front-end em https://github.com/kassiaschipper/ballit21-front

### Pré-requisitos

- Certifique-se de ter o Git instalado em seu sistema.
- Certifique-se de ter o Node.js e o npm (gerenciador de pacotes do Node.js) instalados em seu sistema.
- Certifique-se de ter o React instalado em seu sistema.
- Certifique-se de ter o postgreSQL instalado no seu sistema

### Instalação
1. Clone este repositório:
  ```shell
 git clone <URL do repositório>
  ```
2. Acesse a pasta do projeto:
 ```bash
 cd /ballit21
 ```
3. Crie um banco de dados postgres com o seguinte script
  ```bash
  CREATE TABLE teams ( 
id serial PRIMARY KEY,
name VARCHAR(50) UNIQUE NOT NULL,
war_cry VARCHAR(100) UNIQUE NOT NULL,
year varchar(4) NOT NULL 
);

CREATE TABLE matches (
id serial PRIMARY KEY,
teamA_id integer REFERENCES teams (id) NOT NULL,
teamA_blot integer,
teamA_plif integer, 
teamA_minus_ten integer,
teamB_id integer REFERENCES teams (id) NOT NULL,
teamB_blot integer,
teamB_plif integer, 
teamB_minus_ten integer
);

CREATE TABLE winners (
id serial PRIMARY KEY,
winner_team_name varchar(50) REFERENCES teams (name) NOT NULL,
winner_team_war_cry varchar(300) REFERENCES teams (war_cry) NOT NULL
)
```
4. Ná raiz do projeto crie um arquivo .env conforme arquivo .env.example, lembrando de colocar as informções do seu banco de dados no .env

5. Instale as dependencia do projeto
   ```bash
   cd /ballit21
   ```
   ```bash
   npm install
   ```
6. Acesse a pasta ballit21  
   ```bash
   cd /ballit21
   ```
7. Rode o comando
 ```bash
   npx nodemon index.js
 ```
Se aparecer no console a mensagem Listening on port <port> o back end já está pronto

8. Com o front-end rodando, acesse o link e já pode testar o prjeto
