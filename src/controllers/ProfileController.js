const Profile = require('../model/Profile')

module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() }); //Vai enviar para a pagina o objeto com os dados
  },
  update(req, res) {
    //Pegar os dados do formulário
    const data = req.body;
    //define quantas semanas tem no ano
    const weeksPerYear = 52;
    //Remover as semanas de ferias, para pegar quantas semanas tem em 1 mês
    const weekPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    //Quantas horas por semana de trabalho
    //horas trabalhadas por dia * quantos dias na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
    //horas trabalhadas durante um mês
    const monthlyhTotalHours = weekTotalHours * weekPerMonth;
    //valor da hora de trabalho
    valueHours = data["monthly-budget"] / monthlyhTotalHours;

    //criando um novo objeto com as atualizações
    Profile.update({
      // vai atualizar os dados dentro do Profile.get() == 'data' 
      ...Profile.get(),
      ...req.body,
      "value-hours": valueHours,
    }) 
    return res.redirect("/profile");
  },
};
