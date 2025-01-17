const express = require('express')
const router = express.Router()


//user Routes
const {signupUser , loginUser , isLogin, myAccount, updatePassword} = require('../Controllers/userControllers')



const {jwtAuthMiddleware} = require('../jwt');
const fileUpload = require('express-fileupload');


router.use(fileUpload({
    useTempFiles:true
}))



//user routes

router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/islogin').get(jwtAuthMiddleware,isLogin)
router.route('/myaccount').get(jwtAuthMiddleware,myAccount)
router.route('/changepassword').put(jwtAuthMiddleware,updatePassword)
module.exports = router