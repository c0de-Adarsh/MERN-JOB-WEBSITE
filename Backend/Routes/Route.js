const express = require('express')
const router = express.Router()


//user Routes
const {signupUser , loginUser , isLogin, myAccount, updatePassword , updateProfile, deleteAccount} = require('../Controllers/userControllers')



//job Routes
const {createJob , allJobs, oneJob , savedJob, savedJobsList} = require('../Controllers/jobControllers')


//application routes

const {createApplication, getSingleApplication , getAllUserApplications, deleteApplication} = require('../Controllers/applicationControllers')


//admin routes

const {getAllJobs , getAllUser , getAllApplication , updateApplicationStatus , admindeleteApplication ,getApplication , updateUser , deleteUser , getUser , updateJob ,singleJob , deleteJob} = require('../Controllers/adminControllers')

const {jwtAuthMiddleware,authorizationRole } = require('../jwt');
const fileUpload = require('express-fileupload');


router.use(fileUpload({
    useTempFiles:true
}))



//admin routes
router.route('/admin/alljobs').get(jwtAuthMiddleware , authorizationRole('admin'),getAllJobs)
router.route('/admin/getalluser').get(jwtAuthMiddleware, authorizationRole('admin'),getAllUser)
router.route('/admin/getallappllication').get(jwtAuthMiddleware , authorizationRole('admin'),getAllApplication)
router.route('/admin/updateapplication/:id').put(jwtAuthMiddleware,authorizationRole('admin'),updateApplicationStatus)
router.route('/admin/deleteapplication/:id').delete(jwtAuthMiddleware,authorizationRole('admin'),deleteApplication)
router.route('/admin/deleteapplication/:id').delete(jwtAuthMiddleware,authorizationRole('admin'),admindeleteApplication)
router.route('/admin/getapplication/:id').get(jwtAuthMiddleware,authorizationRole('admin'),getApplication)
router.route('/admin/updateuser/:id').put(jwtAuthMiddleware,authorizationRole('admin'),updateUser)
router.route('/admin/deleteuser/:id').delete(jwtAuthMiddleware,authorizationRole('admin'),deleteUser)
router.route('/admin/getuser/:id').get(jwtAuthMiddleware,authorizationRole('admin'),getUser)
router.route('/admin/updatejob/:id').put(jwtAuthMiddleware,authorizationRole('admin'),updateJob)
router.route('/admin/singlejob/:id').get(jwtAuthMiddleware,authorizationRole('admin'),singleJob)
router.route('/admin/deletejob/:id').delete(jwtAuthMiddleware,authorizationRole('admin'),deleteJob)



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