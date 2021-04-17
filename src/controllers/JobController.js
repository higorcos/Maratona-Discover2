const Job = require("../model/Job");
const JobUtils = require("../utils/jobUtils");
const Profile = require("../model/Profile");

module.exports = {
  createJob(req, res) {
    return res.render("job");
  },
  async saveJob(req, res) {
    //Recebe os dados da criação do job >>>>req.body
    const jobs = await Job.get(); // vai pegar o "data" do job no model

    await Job.create({
      // vai criar o job no model
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), //vai atribuir a data em milissegundos da criação
      annotations: req.body.annotations,
    }); // vai criar o job no model

    return res.redirect("/");
  },
  async show(req, res) {
    //manda os dados para a página
    const jobs = await Job.get(); // vai pegar o "data" do job no model
    const profile = await Profile.get(); // vai pegar  o "data" do profile no model

    const jobId = req.params.id; // parâmetro da url "id"

    const job = jobs.find(
      (jobSearch) => Number(jobSearch.id) === Number(jobId)
    ); // vai retornar o que for verdadeiro

    if (!job) {
      // se o job não for encontrado
      return res.send("Job not found!");
    }
    //se verdadeiro
    job.budget = JobUtils.calculateBudget(job, profile["value-hours"]);

    return res.render("job-edit", { job });
  },
  async update(req, res) {
    //envia os dados necessários para o bando de dados atualização o job
    const jobId = req.params.id; // parâmetro na url "id"

    //objeto com os novos dados para alteração
    const updatedJob = {
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
      annotations: req.body.annotations,
    };
    await Job.update(updatedJob, jobId); 

    res.redirect("/job/" + jobId);
  },
  async delete(req, res) {
    // vai deletar
    // o model que vai fazer a verificação
    const jobId = req.params.id; // parâmetro na url "id"
    await Job.delete(jobId);

    return res.redirect("/");
  },
};
