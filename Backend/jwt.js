const jwt = require('jsonwebtoken')
const User = require('./Model/User')
require('dotenv').config()

const generateToken = (userData) =>{

    try {
        
        const payload = {
            userId: userData._id,
            email: userData.email,
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET ,{expiresIn: '5d'})

        return token
    } catch (error) {
        console.log('Error while creating token',error)
    }
}


const jwtAuthMiddleware = async (req , res , next) =>{
    try {
        
        const authorization = req.headers.authorization;

        if(!authorization){
            return res.status(404).json({
                error:'Token Not Found',
                success:false
            })
        }

        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            return res.status(401).json({error:'Unauthorized'})
        }

         //token validation 
         jwt.verify(token,process.env.JWT_SECRET, async (err , decoded)=>{
            if(err){
                return res.status(402).json({error:'Invalid Token'})
            }

            const user = await User.findById(decoded.userId)

            if(!user){
                return res.status(404).json({error:'User Not Found'})
            }

            req.user = user;

            next()
        })
    } catch (error) {
        console.log('Error during authentication',error)
        res.status({
            error:'Internal Server Error',
            success:false

        })
    }
}


const authorizationRole = (...allowedRoles) =>{
    return (req , res , next) =>{

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:`Access Denied: Role ${req.user.role} is not allowed to access this resource`
            })
        }
        next()
    }
}
module.exports = {generateToken,jwtAuthMiddleware,authorizationRole}