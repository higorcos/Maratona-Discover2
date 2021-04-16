let data = {
  name: "Hígor",
  avatar: "http://github.com/higorcos.png",
  "monthly-budget": 3000, //salário mensal
  "days-per-week": 5, //dias por semana
  "hours-per-day": 18, //horas de trabalho por dia
  "vacation-per-year": 4, //ferias por ano
  "value-hours": 40, //valor da hora trabalhada
};
module.exports ={
    get(){ // quando usado .get será retornado o objeto data 
        return data;
    },
    update(newData){
      data = newData;
    }
}