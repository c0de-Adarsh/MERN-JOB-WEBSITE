const User = require('../Model/User')
const Application = require('../Model/Application')
const Job = require('../Model/Job')

const mongoose = require('mongoose')
const createApplication = async (req, res) => {
    try {

        const jobId = req.params.id;
        const userId = req.user._id;

        const job = await Job.findById(jobId)
        const user = await User.findById(userId)

        //user already applied kar chuka hai ya nahi 
        if (user.appliedJobs.includes(job._id)) {
            return res.status(401).json({
                message: 'You are already applied',
                success: false
            })
        }

        const application = await Application.create({
            job: job._id,
            applicant: user._id,
            applicantResume: {
                public_id: user.resume.public_id,
                url: user.resume.url
            }
        })

        user.appliedJobs.push(job._id)
        await user.save()

        res.status(200).json({
            message: 'Aplication created',
            success: true,
            application
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false
        })
    }
}


const getSingleApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate('job applicant');
        
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }
        
        res.status(200).json({
            success: true,
            application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getAllUserApplications = async ( req , res) =>{
    try {
        
        const application = await Application.find({applicant: req.user._id}).populate('job').populate('applicant')

        res.status(200).json({
            success:true,
            application
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

const deleteApplication = async ( req , res) =>{

    try {
        
        const userId = req.user._id
        const user = await User.findById(userId)

        const application = await Application.findById(req.params.id)

          if(!application){
            return res.status(400).json({
                message:'Application already deleted',
                success:false
            })
          }

          const applicationDelete = await Application.findByIdAndDelete(application)

          const jobId = application.job

          const mongooseObjectId = new mongoose.Types.ObjectId(jobId)

          const newApliedJobs = user.appliedJobs.filter((e)=>(
            e.toString() !== mongooseObjectId.toString()
          ))

          user.appliedJobs = newApliedJobs

          await user.save()

          res.status(200).json({
            message:'Application Deleted',
            success:true
          })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}
module.exports = { createApplication, getSingleApplication , getAllUserApplications , deleteApplication}