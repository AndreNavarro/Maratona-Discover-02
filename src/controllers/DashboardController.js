const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get()

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    // Total de horas por dia de cada Job in progress
    let jobTotalHours = 0
  
    const updatedJobs = jobs.map((job) => {
      //ajustes no job
      const remaining = JobUtils.remainingDays(job)
      const status = remaining <= 0 ? 'done' : 'progress'
  
      // Status = done || progress // vai somar o resultado para qualquer resultado possível
      // Somando a quantidade de status
      statusCount[status] +=1;

      // Total de horas por dia de cada Job in progress
      jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
      
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hours"])
      }
    })
  
    // Qtd de horas que quero trabalhar MENOS qtd de hr/dia de cada job in progress

    const freeHours = profile["hours-per-day"] - jobTotalHours;
    


    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })  
  
  }
}