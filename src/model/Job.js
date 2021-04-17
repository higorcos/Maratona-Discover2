const Database = require("../db/config");

module.exports = {
  async get() {
    //funciona como uma pesquisa
    const db = await Database();

    const jobs = await db.all(`SELECT * FROM jobs `); // o all(todos) vai ser usado para pegar toda dentro do banco de dados

    await db.close();

    return jobs.map((job) => ({
        //a código abaixo funciona com return da função map os () antes da chaves é usado para substituir o return 
        //normalização
        id: job.id,
        name: job.name,
        "daily-hours": job.daily_hours,
        "total-hours": job.total_hours,
        created_at: job.created_at,
        annotations: job.annotations,
    })); 
  },

  async update(updatedJob, jobId) {
    const db = await Database()

    await db.run(`UPDATE jobs SET
    name = "${updatedJob.name}",
    daily_hours = ${updatedJob["daily-hours"]},
    total_hours =${updatedJob["total-hours"]},
    annotations = "${updatedJob.annotations}" 
    WHERE id = ${jobId} --Comentário o updated será feito quando o id for encontrado 
    `)

    await db.close()
  },
  async delete(id){
    const db = await Database()

    //vai tirar  o que tiver "id" igual ao pesquisado
    await db.run(`DELETE FROM jobs WHERE id = ${id}`)

    await db.close()
  },
  async create(newJob) {
    const db = await Database()

    await db.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at,
      annotations
    ) VALUES (
      "${newJob.name}",
      ${newJob["daily-hours"]},
      ${newJob["total-hours"]},
      ${newJob.created_at},
      "${newJob.annotations}" 
    )`)

    await db.close()
    
  },
};

/* 
  id: ,
  name: ,
  daily_hours: ,
  total_hours: ,
  created_at: ,
  annotations:  
  
        id: data.id,
        name: data.name,
        "daily-hours": data.daily_hours,
        "total-hours": data.total_hours ,
        created_at: data.created_at,
        annotations: data.annotations



 ${updatedJob.name},
 ${updatedJob.["daily-hours"]},
${updatedJob.["total-hours"]},
${updatedJob.created_at},
${updatedJob.annotations} 


  
  name: ${updatedJob.name},
  daily_hours: ${updatedJob.["daily-hours"]},
  total_hours:${updatedJob.["total-hours"]},
  created_at: ${updatedJob.created_at},
  annotations: ${updatedJob.annotations} 


        updatedJob.id
        updatedJob.name
        updatedJob.["daily-hours"]
        updatedJob.["total-hours"]
        updatedJob.created_at 
        updatedJob.annotations 
  */
