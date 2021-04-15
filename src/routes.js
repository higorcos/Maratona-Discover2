const express = require('express');
const routes = express.Router()

const views = __dirname + "/views/"

const Profile = {
  data: {
    name: "Hígor",
    avatar: "http://github.com/higorcos.png",
    "monthly-budget": 3000, //salário mensal 
    "days-per-week": 5, //dias por semana
    "hours-per-day": 5, //horas por dia
    "vacation-per-year": 4, //ferias por ano 
    "value-hours": 40,  //valor da hora trabalhada
  },
  controllers: {
    index(req,res) {
      return res.render(views + "profile", { profile: Profile.data }) //Vai enviar para a pagina o objeto com os dados
    },
    update(req,res){
      //Pegar os dados do formulário
      const data = req.body
      //define quantas semanas tem no ano 
      const weeksPerYear = 52
      //Remover as semanas de ferias, para pegar quantas semanas tem em 1 mês
      const weekPerMonth = (weeksPerYear - data['vacation-per-year']) / 12
      //Quantas horas por semana de trabalho 
      //horas trabalhadas por dia * quantos dias na semana
      const weekTotalHours = data['hours-per-day'] * data['days-per-week']
      //horas trabalhadas durante um mês
      const monthlyhTotalHours = weekTotalHours * weekPerMonth
      //valor da hora de trabalho 
      valueHours = data['monthly-budget'] / monthlyhTotalHours

      Profile.data = { // vai atualizar os dados dentro do Profile.data
        ...Profile.data,
        ...req.body,
        "value-hours": valueHours,
      }
      return res.redirect('/profile')
    },
  }
}
const Job = {
  data: [
    {
      id: 1,
      name: 'Site da loja',
      'daily-hours': 2,
      'total-hours': 1,
      created_at: Date.now(),
      annotations: '11111111111',
    
    },
    {
      id: 2,
      name: 'Site da curso',
      'daily-hours': 5,
      'total-hours': 90,
      created_at: Date.now(),
      annotations: '222222222222',
      
     
    },
    {
      id: 3,
      name: 'QA',
      'daily-hours': 9,
      'total-hours': 30,
      created_at: Date.now(),
      annotations: '33333333333',
      
    },
  ],

  controllers: {
    // a mesma coisa que index: function {}  || index: () => {}
    index(req, res) { //página inicial

      const updatedJobs = Job.data.map((job) => { //vai criar um novo job com o map 
        const deadline = Job.services.deadlineDay(job) // função prazo, que está dentro do objeto >>> services
        const status = deadline <= 0 ? 'done' : 'progress' // se <= 0 é done se não progress 
        //const annotations = 'nada'
        
        return {
          ...job, //joga tudo em um novo objeto
          deadline,
          status,
         // annotations,//provavelmente nem precisa pois a dados ja vão vim com as anotações 
          budget: Job.services.calculateBudget(job, Profile.data['value-hours']) //Custo do trabalho
           
        }
        
      })
      return res.render(views + "index", { jobs: updatedJobs })
    },
    createJob(req, res) {
      return res.render(views + "job")
    },
    saveJob(req, res) {//Recebe os dados da criação de job
      //req.body
      const lastId = Job.data[Job.data.length - 1]?.id || 0; //  ? ==se 

      Job.data.push({
        id: lastId + 1,
        name: req.body['name'],
        'daily-hours': req.body['daily-hours'],
        'total-hours': req.body['total-hours'],
        annotations: req.body['annotations'],
        created_at: Date.now(), //vai atribuir a data em milisegundos da criação 
      })

      return res.redirect('/')
    },
    show(req,res) { //manda os dados para a página
      const jobId = req.params.id // parementro na url "id"

      const job = Job.data.find((jobSearch)=> Number(jobSearch.id) === Number(jobId))

      if(!job) {// se o job não for encontrado 
        return res.send('Job not found!')
      }
      job.budget = Job.services.calculateBudget(job, Profile.data['value-hours'])
      return res.render(views + "job-edit", {job })
    },
    update(req, res){ //atualização dos dados do job
      const jobId = req.params.id // parementro na url "id"
      

      const job = Job.data.find((jobSearch)=> Number(jobSearch.id) === Number(jobId))

      if(job) {// se o job for encontrado 

        //novo objeto com as alterações
        const updatedJob = {
          ...job,
          name: req.body.name,
          'total-hours': req.body['total-hours'],
          'daily-hours': req.body['daily-hours'],
          annotations: req.body['annotations'],
        }
        //manda as alterações do novo objeto para o antigo, que é usado pelas outras rotas "job"
        Job.data = Job.data.map(job => {
          if(Number(job.id) === Number(jobId)){
          job = updatedJob
          }
          return job
        })
      }else{ //se não for encontrado
        return res.send('Job not found!')
      }
      res.redirect('/job/'+ jobId)
    },
    delete(req,res){
      const jobId = req.params.id // parementro na url "id"

      Job.data = Job.data.filter((job) => Number(job.id) !== Number(jobId))
     
      return res.redirect('/')
    }
  },  
 
  services: {
    deadlineDay(job) {//prazo

      //calcular tempo restante 
      const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed() //tempo restante = todal de horas / dias 

      const createDate = new Date(job.created_at) //tá pegando a data da criação em milisegundos que está objeto 

      const endDay = createDate.getDate() + Number(remainingDays) //dia em que vai ser finalizada (data no futuro)

      const endDateMS = createDate.setDate(endDay)// Data que será o fim da tarefa em ms
      const timeDifMs = endDateMS - Date.now() //diferença em milisegundos dia do fim - dia atual
      //transformando a diferença de milesegundos em dias
      const dayMs = 1000 * 60 * 60 * 24
      const dayDif = Math.floor(timeDifMs / dayMs) //prazo para o fim do projeto em dias

      return dayDif
    },
    calculateBudget: (job, valueHours) => valueHours * job['total-hours'] 
    
    //Custo do trabalho

  },
}



//Tudo as reposta e requerimento então dentro dos um objetos
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.createJob)
routes.post('/job', Job.controllers.saveJob)
routes.get('/job/:id', Job.controllers.show)
routes.post('/job/:id', Job.controllers.update)
routes.post('/job/delete/:id', Job.controllers.delete)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)



module.exports = routes;