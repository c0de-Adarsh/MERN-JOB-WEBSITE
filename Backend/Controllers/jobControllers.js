const User = require('../Model/User')
const Job = require('../Model/Job')
const cloudinary = require('cloudinary').v2



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createJob = async ( req , res) =>{

    try {
        
        const {title , description , companyName , location , skillsRequired , experience , salary , category , employementType} = req.body

        if(!req.files || !req.files.logo){
            return res.status(401).json({
                message:'Please upload CompanyLogo',
                success:false
            })
        }


        const myLogo = await cloudinary.uploader.upload(req.files.logo.tmepFilePath,{
            folder:'logo',
            resource_type:'image',
            crop:'scale'
        })

        const newJob = await Job.create({
            title,
            description,
            companyName,
            companyLogo: {
                public_id:myLogo.public_id,
                url:myLogo.secure_url
            },
            location,
            skillsRequired,
            experience,
            salary,
            category,
            employmentType,
            postedBy:req.user._id

        })

        res.status(200).json({
            message:'Job created Successfully',
            success:true,
            newJob
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal Server Error',
            success:false
        })
    }
}

module.exports = {createJob}