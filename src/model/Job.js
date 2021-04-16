let data = [
      {
        id: 1,
        name: "Site da loja",
        "daily-hours": 2,
        "total-hours": 1,
        created_at: Date.now(),
        annotations: "11111111111",
      },
      {
        id: 2,
        name: "Site da curso",
        "daily-hours": 5,
        "total-hours": 90,
        created_at: Date.now(),
        annotations: "222222222222",
      },
      {
        id: 3,
        name: "QA",
        "daily-hours": 9,
        "total-hours": 30,
        created_at: Date.now(),
        annotations: "33333333333",
      },
    ];

module.exports = {
    get(){ //funciona como uma pesquisa
      return data;
    },
    update(newJobs){

      data = newJobs;
    },
    delete(id){
      data = data.filter(job => Number(job.id) !== Number(id)) //vai tirar  o que tiver "id" igual ao pesquisado 
    },
    create(newJob){
      data.push(newJob)
    }
 
}