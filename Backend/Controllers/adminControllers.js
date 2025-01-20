const Job = require('../Model/Job')
const Application = require('../Model/Application')
const User = require('../Model/User')
const cloudinary = require('cloudinary').v2

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

const getAllUser = async (req, res) => {
    try {
        
        const user = await User.find()

        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}

const getAllApplication = async ( req , res ) =>{

    try {
       
       const application = await Application.find()
       
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


 const updateApplicationStatus = async ( req , res) =>{

    try {
       
       const applicationId = req.params.id
       const application = await Application.findById(applicationId)
       
       application.status = req.body.status

       await application.save()

       res.status(200).json({
           message:'Application Updated',
           success:true
       })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
 }

 const admindeleteApplication = async ( req , res) =>{

    try {
       
        const applicationId = req.params.id

        const application = await Application.findById(applicationId)

        res.status(200).json({
            message:'Application Deleted Successfully',
            success:false
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
 }

 const getApplication = async ( req ,  res) =>{
    try {
       
      const applicationId = req.params.id
      
      const application = await Application.findById(applicationId).populate('job applicant')

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

 const updateUser = async ( req , res) =>{
  
    try {
        
        const userId = req.params.id
        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                message:'User Not Found',
                success:false
            })
        }

        user.role = req.body.role

        await user.save()

        res.status(200).json({
            message:'User Updated Successfully',
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }

 }

 const deleteUser = async ( req , res ) =>{

    try {
       
        const userId = req.params.id

        const user = await User.findByIdAndDelete(userId)

        res.status(200).json({
            message:'User Deleted Sucessfully',
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
 }

  const getUser = async ( req , res) =>{

    try {
       const userId = req.params.id
       
       const user = await User.findById(userId)

       res.status(200).json({
         success:true,
         user
       })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
  }

  const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        
        // Delete old logo if exists
        if (job.companyLogo && job.companyLogo.public_id) {
            await cloudinary.uploader.destroy(job.companyLogo.public_id);
        }

        // Upload new logo if file is present
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'logo',
                crop: 'scale'
            });

            req.body.companyLogo = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        // Update other job details
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedJob
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


 const singleJob = async ( req , res) =>{

    try {
       
        const jobId = req.params.id;
         
        const job = await Job.findById(jobId)

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

 const deleteJob = async ( req , res) =>{

    try {
       
        const jobId = req.params.id

        const job = await Job.findByIdAndDelete(jobId)

        res.status(200).json({
            message:'Job deleted Successfully',
            success:true
        })
    } catch (error) {
        res.status(500).json({
            message:error.message,
            success:true
        })
    }
 }
module.exports = {getAllJobs,getAllUser,getAllApplication,updateApplicationStatus,admindeleteApplication,getApplication,updateUser , deleteUser , getUser ,updateJob , singleJob ,deleteJob}