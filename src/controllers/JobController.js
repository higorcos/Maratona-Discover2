const Job = require("../model/Job");
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')

module.exports = {
  createJob(req, res) {
    return res.render("job");
  },
  saveJob(req, res) {
    //Recebe os dados da criação do job >>>>req.body
    const jobs = Job.get(); // vai pegar o "data" do job no model
    //verifica número de jobs|tamanho 
    const lastId = jobs[jobs.length - 1]?.id || 0; //  ? == if 

    Job.create({ // vai criar o job no model
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      annotations: req.body.annotations,
      created_at: Date.now(), //vai atribuir a data em milissegundos da criação
    }); // vai criar o job no model 

    return res.redirect("/");
  },
  show(req, res) {
    //manda os dados para a página
    const jobs = Job.get(); // vai pegar o "data" do job no model
    const profile = Profile.get() // vai pegar  o "data" do profile no model

    const jobId = req.params.id; // parâmetro da url "id"

    const job = jobs.find((jobSearch) => Number(jobSearch.id) === Number(jobId)); // vai retornar o que for verdadeiro 

    if (!job) {
      // se o job não for encontrado
      return res.send("Job not found!");
    }
    //se verdadeiro
    job.budget = JobUtils.calculateBudget(job, profile["value-hours"]);

    return res.render("job-edit", { job });
  },
  update(req, res) {
    //atualização dos dados do job
    const jobs = Job.get(); // vai pegar o "data" do job no model
    const profile = Profile.get() // vai pegar  o "data" do profile no model

    const jobId = req.params.id; // parâmetro na url "id"

    const job = jobs.find((jobSearch) => Number(jobSearch.id) === Number(jobId));//só pega o verdadeiro

    if (!job) {
      //se não for encontrado
      return res.send("Job not found!");
    }
      // se o job for encontrado

      //novo objeto com as alterações
      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body["total-hours"],
        "daily-hours": req.body["daily-hours"],
        annotations: req.body.annotations,
      };

      //manda as alterações do novo objeto para o antigo, que é usado pelas outras rotas "job"
      const newJobs = jobs.map((job) => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob; //manda o update para a antigo 
        }
        return job;
      });

      Job.update(newJobs) //o resultado do update é mandado para o model

    
    res.redirect("/job/" + jobId);
  },
  delete(req, res) {
    // vai deletar 
    // o model que vai fazer a verificação 
    const jobId = req.params.id; // parâmetro na url "id"
    Job.delete(jobId);
    return res.redirect("/");
  },
};
