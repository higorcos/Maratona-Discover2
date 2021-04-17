const Database = require('../db/config')

module.exports ={
    async get(){ // quando usado .get será retornado o objeto data 

      const db = await Database()//inicia a conexão
      const data = await db.get(`SELECT * FROM profile`) //vai guardar o resultado em data //get vai retornar apenas 1

      db.close()// vai finalizar a conexão

      return {
          //normalização 
          name: data.name,
          avatar: data.avatar,
          "monthly-budget": data.monthly_budget, //salário mensal
          "days-per-week": data.days_per_week, //dias por semana
          "hours-per-day": data.hours_per_day, //horas de trabalho por dia
          "vacation-per-year": data.vacation_per_year, //ferias por ano
          "value-hours": data.value_hours, //valor da hora trabalhada
        
      }
    },
    async update(newData){ //update dos dados do perfil 
      const db = await Database()

    await  db.run(`UPDATE profile SET 
      name = "${newData.name}",
      avatar = "${newData.avatar}",
      monthly_budget = ${newData["monthly-budget"]},
      days_per_week = ${newData["days-per-week"]},
      hours_per_day = ${newData["hours-per-day"]},
      vacation_per_year = ${newData["hours-per-day"]},
      value_hours = ${newData["value-hours"]}
      `)
      await db.close()
    }
  }