const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) { //página do perfil 
    return res.render("profile", { profile: await Profile.get() }); //Vai enviar para a pagina o objeto com os dados
  },
  async update(req, res) {
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
    const monthlyTotalHours = weekTotalHours * weekPerMonth;
    //valor da hora de trabalho
    const valueHours = data["monthly-budget"] / monthlyTotalHours;

    const profile = await Profile.get()

    //criando um novo objeto com as atualizações
    await Profile.update({
      // vai atualizar os dados dentro do profile == Profile.get() == 'data' 
      ...profile,
      ...req.body,
      "value-hours": valueHours,
    }) 
    return res.redirect("/profile");
  },
};
