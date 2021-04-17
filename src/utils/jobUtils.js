module.exports = {
    deadlineDay(job) {
      //prazo

      //calcular tempo restante
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(); //tempo restante = todal de horas / dias

      const createDate = new Date(job.created_at); //tá pegando a data da criação em milisegundos que está objeto

      const endDay = createDate.getDate() + Number(remainingDays); //dia em que vai ser finalizada (data no futuro)

      const endDateMS = createDate.setDate(endDay); // Data que será o fim da tarefa em ms
      const timeDifMs = endDateMS - Date.now(); //diferença em milisegundos dia do fim - dia atual
      //transformando a diferença de milesegundos em dias
      const dayMs = 1000 * 60 * 60 * 24;
      const dayDif = Math.ceil(timeDifMs / dayMs); //prazo para o fim do projeto em dias

      return dayDif;
    },
    calculateBudget: (job, valueHours) => valueHours * job["total-hours"],//Custo do trabalho

  }