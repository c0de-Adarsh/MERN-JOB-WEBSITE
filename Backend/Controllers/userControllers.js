const User = require('../Model/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('../jwt')
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const signupUser = async (req, res) => {
    try {

        const { name, email, password,  skills,  } = req.body

        if(!req.files || !req.files.avatar || !req.files.resume){
            return res.status(401).json({
                success:false,
                message:'Please upload both resume and avatar'
            })
        }

        //upload avtar and resume to Cloudinary
        // const avtarUpload = await cloudinary.uploader.upload(avatar, { folder: 'avatar', crop: 'scale' })

        const avtarUpload = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, {
            folder: 'avatar',
            resource_type: 'image',
            crop: 'scale'
        })


        //const resumeUpload = await cloudinary.uploader.upload(resume, { folder: 'resume', crop: 'fit' })
        
        // Upload resume - use the path of the temporary file
        const resumeUpload = await cloudinary.uploader.upload(req.files.resume.tempFilePath, {
            folder: 'resume',
            resource_type: 'auto', // Important for PDF files
            crop: 'fit'
        })

        //hast the password before saving 

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            avatar: { public_id: avtarUpload.public_id, url: avtarUpload.secure_url },
            skills,
            resume: { public_id: resumeUpload.public_id, url: resumeUpload.secure_url }
        })

        //generate token

        const token = generateToken(user._id, user.email)

        res.status(200).json({
            success: true,
            message: 'User Register Successfully',
            token,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}




const loginUser = async ( req , res) =>{
    try {
        
        const {email , password} = req.body

        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:'Email and Password are required'
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                message:'User Not Found',
                success:false
            })
        }

      const isMatch = await bcrypt.compare(password,user.password)

      if(!isMatch){
        return res.status(401).json({
            message:'Incorrect Password',
            success:false
        })

      }

      const token = generateToken(user._id , user.email)


      res.status(200).json({
        message:'User LoggedIn Successfully',
        success:false,
        token
      })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'Internal Server Error',
            success:false
        })
    }
}


const isLogin = async ( req , res) =>{
    try {
        const userId = req.user._id

        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                message:"User Not Found",
                LoggedIn:false,
                success:false
            })

        } else {
            return res.status(200).json({
                success: true,
                isLogin: true
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
    
}

const myAccount = async ( req , res) =>{
    try {
        
        const userId = req.user._id

        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                message:"User Not Found",
                success:false
            })
        }

        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

 const updatePassword = async ( req , res) =>{
    try {
        const {oldPassword , newPassword , confirmPassword} = req.body

        const userId = req.user._id;

        const user = await User.findById(userId)

        const userPassword = user.password;

        const isMatch = await bcrypt.compare(oldPassword , userPassword )

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Old password is wrong"
            })
        }

        if(oldPassword === newPassword){
            return res.status(401).json({
                message:'Old Password And New Password Is Same'
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(401).json({
                message:'New password and Confirm password does not matched'
            })
        }

        const hashPassword = await bcrypt.hash(newPassword,10)

        user.password = hashPassword

        await user.save()

        res.status(200).json({
            message:'Password Change Successfully',
            success:true
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
 }
module.exports = { signupUser , loginUser , isLogin, myAccount , updatePassword}

