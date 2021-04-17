//molde do banco de dados
const Database = require("./config");

const initDb = {
    
    //await == esperar 
    // o await precisa ficar dentro de uma função async(fala para o javascript que vai rodar await)
    async init() {

    const db = await Database(); //inicia CONEXÃO  "await" vai esperar iniciar
        // vai armazena ela precisa ter do resultado para executar o proximo 

        //vai executar no bando de o que for passado como parâmetro da função exemplo exec(parâmetro)
    await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hours INT
)`);

    await db.exec(`CREATE TABLE jobs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    total_hours INT,
    created_at DATETIME,
    annotations STRING
)`);

    await db.run(`INSERT INTO profile(
    name,
    avatar,
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hours
)VALUES(
   "Hígor",
   "http://github.com/higorcos.png",
    3000, 
    5,
    18, 
    4, 
    50 
);
`)

    await db.run(` INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at,
    annotations
)VALUES(

    "Site da loja",
    2,
    1,
    1617514376018,
    "texto string"
)`)

    await db.run(` INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    created_at,
    annotations
)VALUES(
    "curso",
    3,
    47,
    1617514376018,
    "texto string 2"
)`)

 await db.close(); //fim CONEXÃO 
    }
}

initDb.init() // vai executar a função que tá dentro do objeto initDb





/*   name: "Hígor",
  avatar: "http://github.com/higorcos.png",
  "monthly-budget": 3000, //salário mensal
  "days-per-week": 5, //dias por semana
  "hours-per-day": 18, //horas de trabalho por dia
  "vacation-per-year": 4, //ferias por ano
  "value-hours": 40, //valor da hora trabalhada
   */