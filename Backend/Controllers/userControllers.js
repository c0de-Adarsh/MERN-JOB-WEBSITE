const User = require('../Model/User')
const bcrypt = require('bcrypt')
const { generateToken } = require('../jwt')
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// const signupUser = async (req, res) => {
//     try {

//         const { name, email, password,  skills,  } = req.body

//         if(!req.files || !req.files.avatar || !req.files.resume){
//             return res.status(401).json({
//                 success:false,
//                 message:'Please upload both resume and avatar'
//             })
//         }

//         //upload avtar and resume to Cloudinary
//         // const avtarUpload = await cloudinary.uploader.upload(avatar, { folder: 'avatar', crop: 'scale' })

//         const avtarUpload = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, {
//             folder: 'avatar',
//             resource_type: 'image',
//             crop: 'scale'
//         })


//         //const resumeUpload = await cloudinary.uploader.upload(resume, { folder: 'resume', crop: 'fit' })
        
//         // Upload resume - use the path of the temporary file
//         const resumeUpload = await cloudinary.uploader.upload(req.files.resume.tempFilePath, {
//             folder: 'resume',
//             resource_type: 'auto', // Important for PDF files
//             crop: 'fit'
//         })

//         //hast the password before saving 

//         const hashPassword = await bcrypt.hash(password, 10)

//         const user = await User.create({
//             name,
//             email,
//             password: hashPassword,
//             avatar: { public_id: avtarUpload.public_id, url: avtarUpload.secure_url },
//             skills,
//             resume: { public_id: resumeUpload.public_id, url: resumeUpload.secure_url }
//         })

//         //generate token

//         const token = generateToken(user._id, user.email)

//         res.status(200).json({
//             success: true,
//             message: 'User Register Successfully',
//             token,
//             user
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: error.message,
//             success: false
//         })
//     }
// }

const signupUser = async (req, res) => {
    try {
        const { name, email, password, skills  } = req.body;
      

        const role = req.body.role?.replace(/['"]+/g, '') || 'applicant';

        //console.log('Processed role:', role); // Debug log
        // Check if files exist
        if (!req.files || !req.files.avatar || !req.files.resume) {
            return res.status(401).json({
                success: false,
                message: 'Please upload both resume and avatar'
            });
        }

        // Get the first file if arrays are sent
        const avatar = Array.isArray(req.files.avatar) ? req.files.avatar[0] : req.files.avatar;
        const resume = Array.isArray(req.files.resume) ? req.files.resume[0] : req.files.resume;

        // Upload avatar
        const avtarUpload = await cloudinary.uploader.upload(avatar.tempFilePath, {
            folder: 'avatar',
            resource_type: 'image',
            crop: 'scale'
        });

        // Upload resume
        const resumeUpload = await cloudinary.uploader.upload(resume.tempFilePath, {
            folder: 'resume',
            resource_type: 'auto',
            crop: 'fit'
        });

        // Hash the password before saving
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            avatar: { public_id: avtarUpload.public_id, url: avtarUpload.secure_url },
            skills,
            resume: { public_id: resumeUpload.public_id, url: resumeUpload.secure_url },
            role
        });

        // Generate token
        const token = generateToken(user._id, user.email);

        res.status(200).json({
            success: true,
            message: 'User Register Successfully',
            token,
            user
        });

    } catch (error) {
        console.log('Detailed error:', error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};


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



 const updateProfile = async (req, res) => {
    try {
        const { newName, newEmail, newSkills } = req.body
        const userId = req.user._id

        // Find the user
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        // Check if files are present in request
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: 'Please upload files'
            })
        }

        // Handle Avatar Update
        if (req.files.newAvatar) {
            // Delete old avatar
            if (user.avatar.public_id) {
                await cloudinary.uploader.destroy(user.avatar.public_id)
            }
            
            // Upload new avatar
            const myAvatar = await cloudinary.uploader.upload(req.files.newAvatar.tempFilePath, {
                folder: 'avatar',
                crop: 'scale',
            })

            user.avatar = {
                public_id: myAvatar.public_id,
                url: myAvatar.secure_url
            }
        }

        // Handle Resume Update
        if (req.files.newResume) {
            // Delete old resume
            if (user.resume.public_id) {
                await cloudinary.uploader.destroy(user.resume.public_id)
            }

            // Upload new resume
            const myResume = await cloudinary.uploader.upload(req.files.newResume.tempFilePath, {
                folder: 'resume',
                resource_type: 'auto',
                crop: 'fit'
            })

            user.resume = {
                public_id: myResume.public_id,
                url: myResume.secure_url
            }
        }

        // Update other fields
        if (newName) user.name = newName
        if (newEmail) user.email = newEmail
        if (newSkills) {
            // Parse skills if it's a string
            user.skills = typeof newSkills === 'string' ? JSON.parse(newSkills) : newSkills
        }

        // Save the updated user
        await user.save()

        res.status(200).json({
            message: 'Profile Updated',
            success: true,
            user
        })

    } catch (error) {
        console.log('Error:', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteAccount = async ( req , res) =>{
    try {
        
        const userId = req.user

        const user = await User.findById(userId)

        const isMatch = await bcrypt.compare(req.body.password , user.password)

        if(isMatch){
           await User.findByIdAndDelete(userId)
        } else{
            return res.status(401).json({
                message:'Password Does Not Matched',
                success:'False'
            })
        }

        res.status(200).json({
            message:'Account Deleted',
            success:true
        })
 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}
module.exports = { signupUser , loginUser , isLogin, myAccount , updatePassword , updateProfile , deleteAccount}

