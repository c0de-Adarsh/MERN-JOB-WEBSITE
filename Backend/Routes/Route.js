const express = require('express')
const router = express.Router()


//user Routes
const {signupUser , loginUser , isLogin, myAccount, updatePassword , updateProfile, deleteAccount} = require('../Controllers/userControllers')



//job Routes
const {createJob , allJobs, oneJob} = require('../Controllers/jobControllers')

const {jwtAuthMiddleware,authorizationRole} = require('../jwt');
const fileUpload = require('express-fileupload');


router.use(fileUpload({
    useTempFiles:true
}))



//job routes
router.route('/create/job').post(jwtAuthMiddleware,authorizationRole("admin"),createJob)
router.route('/alljobs').get(allJobs)
router.route('/job/:id').get(oneJob)



//user routes

router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/islogin').get(jwtAuthMiddleware,isLogin)
router.route('/myaccount').get(jwtAuthMiddleware,myAccount)
router.route('/changepassword').put(jwtAuthMiddleware,updatePassword)
router.route('/updateprofile').put(jwtAuthMiddleware,updateProfile)
router.route('/deleteaccount').delete(jwtAuthMiddleware,deleteAccount)
module.exports = router