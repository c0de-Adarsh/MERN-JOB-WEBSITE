const User = require('../Model/User')
const Job = require('../Model/Job');
const { default: mongoose } = require('mongoose');
const cloudinary = require('cloudinary').v2



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createJob = async (req, res) => {

    try {

        const { title, description, companyName, location, skillsRequired, experience, salary, category, employementType } = req.body

        if (!title || !description || !companyName || !location ||
            !skillsRequired || !experience || !salary ||
            !category || !employementType) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        }

        if (!req.files || !req.files.logo) {
            return res.status(401).json({
                message: 'Please upload CompanyLogo',
                success: false
            })
        }


        const myLogo = await cloudinary.uploader.upload(req.files.logo.tempFilePath, {
            folder: 'logo',
            resource_type: 'image',
            crop: 'scale'
        })

        const newJob = await Job.create({
            title,
            description,
            companyName,
            companyLogo: {
                public_id: myLogo.public_id,
                url: myLogo.secure_url
            },
            location,
            skillsRequired,
            experience,
            salary,
            category,
            employementType,
            postedBy: req.user._id

        })

        res.status(200).json({
            message: 'Job created Successfully',
            success: true,
            newJob
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}



const allJobs = async (req, res) => {

    try {

        const jobs = await Job.find()

        res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

const oneJob = async (req, res) => {
    try {

        const userId = req.params.id

        const job = await Job.findById(userId).populate('postedBy')

        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const savedJob = async (req, res) => {
    try {

        const userId = req.user._id;

        const user = await User.findById(userId)

        const jobId = req.params.id

        //user ki savedjobs list me job phle se saved hai ya nahi 
        if (user.savedJobs.includes(jobId)) {

            // agar job save hai to unsaved the jobs
            const jobObjectId = new mongoose.Types.ObjectId(jobId)

            const arr = user.savedJobs.filter(jobid => jobid.toString() !== jobObjectId.toString())


            user.savedJobs = arr

            await user.save()

            res.status(200).json({
                success: true,
                message: "Job Unsaved"
            })
        } else {
            //saved the job

            const jobObjectId = new mongoose.Types.ObjectId(jobId)
            user.savedJobs.push(jobObjectId)

            await user.save()
            res.status(200).json({
                message: 'Jobs Saved',
                success: true
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}


const savedJobsList = async (req, res) => {
    try {

        const userId = req.user._id;

        const user = await User.findById(userId).populate('savedJobs')

        res.status(200).json({
            success: true,
            savedJob: user.savedJobs
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}
module.exports = { createJob, allJobs, oneJob, savedJob, savedJobsList }