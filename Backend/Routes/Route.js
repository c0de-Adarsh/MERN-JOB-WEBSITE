const express = require('express')
const router = express.Router()


//user Routes
const {signupUser , loginUser , isLogin, myAccount, updatePassword , updateProfile, deleteAccount} = require('../Controllers/userControllers')



//job Routes
const {createJob , allJobs, oneJob , savedJob, savedJobsList} = require('../Controllers/jobControllers')


//application routes

const {createApplication, getSingleApplication , getAllUserApplications, deleteApplication} = require('../Controllers/applicationControllers')


//admin routes

const {gettAllJobs, getAllJobs} = require('../Controllers/adminControllers')
const {jwtAuthMiddleware,authorizationRole} = require('../jwt');
const fileUpload = require('express-fileupload');


router.use(fileUpload({
    useTempFiles:true
}))



//admin routes
router.route('/admin/alljobs').get(jwtAuthMiddleware , authorizationRole('admin'),getAllJobs)

//job routes
router.route('/create/job').post(jwtAuthMiddleware,authorizationRole("admin"),createJob)
router.route('/alljobs').get(allJobs)
router.route('/job/:id').get(oneJob)
router.route('/savedjobs/:id').get(jwtAuthMiddleware,savedJob)
router.route('/getsavedjobs').get(jwtAuthMiddleware,savedJobsList)


//user routes

router.route('/signup').post(signupUser)
router.route('/login').post(loginUser)
router.route('/islogin').get(jwtAuthMiddleware,isLogin)
router.route('/myaccount').get(jwtAuthMiddleware,myAccount)
router.route('/changepassword').put(jwtAuthMiddleware,updatePassword)
router.route('/updateprofile').put(jwtAuthMiddleware,updateProfile)
router.route('/deleteaccount').delete(jwtAuthMiddleware,deleteAccount)


//application routes
router.route('/createapplication/:id').post(jwtAuthMiddleware,createApplication)
router.route('/singleapplication/:id').get(jwtAuthMiddleware,getSingleApplication)
router.route('/getallapplication').get(jwtAuthMiddleware,getAllUserApplications)
router.route('/deleteapplication/:id').delete(jwtAuthMiddleware,deleteApplication)
module.exports = router