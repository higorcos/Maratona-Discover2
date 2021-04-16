const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/jobUtils')

module.exports = {
  index(req, res) {
    // index: function {}  || index: () => {}
    //página inicial
    const jobs = Job.get(); // vai pegar o "data" do job no model
    const profile = Profile.get(); // vai pegar  o "data" do profile no model

    let statusCount = {
        progress: 0,
        done: 0,
        total: jobs.length,
    }
    //Total de horas por dia de cada job em progresso
    let jobTotalHours = 0;

    const updatedJobs = jobs.map((job) => {
      //ajustes
      //vai criar um novo job com o map
      const deadline = JobUtils.deadlineDay(job); // função prazo, que está dentro do utils
      const status = deadline <= 0 ? "done" : "progress"; // se <= 0 é done se não progress

    //status = done || progress 
        statusCount[status] ++ //vai somar o contar a quantidade de done e a quantidade de progress no statusCount

    //Total de horas por dia de cada job em progresso
    //forma ternaria
    // ? == if
    // : == else
    jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) :jobTotalHours
 

      return {
        ...job, //joga tudo em um novo objeto
        deadline,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hours"]), //Custo do trabalho
      };
    });

    //quantidade de horas que quero trabalhar(profile) - quantas horas/dia de cada job em progress
    const freeHours = profile['hours-per-day']- jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: {freeHours, jobTotalHours}}); //esse jobs vai para o front
  },
};
