const Job = require('../Model/Job')
const Application = require('../Model/Application')
const User = require('../Model/User')

const getAllJobs = async ( req , res) =>{
    try {
       
        const job = await Job.find()

        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

module.exports = {getAllJobs}