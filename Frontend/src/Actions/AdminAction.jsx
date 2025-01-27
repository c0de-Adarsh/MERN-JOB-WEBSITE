import axios from "axios"
import { deleteAppFail, deleteAppRequest, deleteAppSuccess, deleteJobFail, deleteJobRequest, deleteJobSuccess, deleteUserRequest, deleteUserSuccess, getAllAppRequest, getAllAppSuccess, getAllJobsFail, getAllJobsRequest, getAllJobsSuccess, getAllUserFail, getAllUserRequest, getAllUserSuccess, getAppFail, getAppRequest, getAppSuccess, getJobFail, getJobRequest, getJobSuccess, getUserFail, getUserRequest, getUserSuccess, updateAppFail, updateAppRequest, updateAppSuccess, updateJobFail, updateJobRequest, updateJobSuccess, updateUserRequest, updateUserSuccess } from "../Slice/AdminSlice"
import API from "../Utils/Index"
import { toast } from "react-toastify"


export const getAlljobsAdmin = () => async (dispatch) =>{
    try {
        
        dispatch(getAllJobsRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/admin/alljobs`,config)

        dispatch(getAllJobsSuccess(data.job))
    } catch (error) {
        dispatch(getAllJobsFail(error.response.data.message))
    }
}

export const getAllUserAdmin = () => async (dispatch) =>{
    try {
       
        dispatch(getAllUserRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/admin/getalluser`,config)

        dispatch(getAllUserSuccess(data.user))
    } catch (error) {
        dispatch(getAllUserFail(error.response.data.message))
    }
}

export const getAllAppAdmin = () => async (dispatch) =>{
    try {
       
        dispatch(getAllAppRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/admin/getallappllication`,config)

        dispatch(getAllAppSuccess(data.application))
    } catch (error) {
        dispatch(error.response.data.message)
    }
}

export const getAppData = (id) => async (dispatch) =>{
    try {
       
        dispatch(getAppRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/admin/getapplication/${id}`)

        dispatch(getAppSuccess(data.application))
    } catch (error) {
        dispatch(getAppFail(error.response.data.response))
    }
}

export const  updateApplication = (id,bodyData) => async (dispatch) =>{
    try {
        
        if(bodyData.status === 'not'){
            toast.info('Please Select Info')
        } else {
            dispatch(updateAppRequest())
        }

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.put(`${API}/admin/updateapplication/${id}`,config)

        dispatch(updateAppSuccess())
        dispatch(getAppData(id))
        toast.success('Data Updated !')
    } catch (error) {
        dispatch(updateAppFail(error.response.data.message))
    }
}

export const deleteApplication = (id) => async (dispatch) =>{
    try {
        
        dispatch(deleteAppRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.delete(`${API}/admin/deleteapplication/${id}`,config)
        dispatch(getAllAppAdmin())
        dispatch(deleteAppSuccess())
    } catch (error) {
        dispatch(deleteAppFail(error.response.data.message))
    }
}

export const getUserData = (id) => async (dispatch) =>{
    try {
        
        dispatch(getUserRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/admin/getuser/${id}`,config)

        dispatch(getUserSuccess(data.user))
    } catch (error) {
        dispatch(getUserFail(error.response.data.message))
    }
}

export const updateUser = (id,userData) => async (dispatch) =>{
    try {
       
        dispatch(updateUserRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.put(`${API}/admin/updateuser/${id}`,userData,config)
        
        dispatch(getUserData(id))
        toast.success('Role updated Successfully')
        dispatch(updateUserSuccess())
    } catch (error) {
        dispatch(error.response.data.message)
    }
}

export const  deleteUser = (id) => async (dispatch) =>{
   try {
    
    dispatch(deleteUserRequest())

    const config = {
        headers:{
            Authorization: `${localStorage.getItem('userToken')}`
        }
    }

    const {data} = await axios.delete(`${API}/admin/deleteuser/${id}`,config)
   
    dispatch(getAllUserAdmin())
    toast.success('User Deleted Successfully')
    dispatch(deleteUserSuccess())
   } catch (error) {
     dispatch(error.response.data.message)
   }
}

export const getJobData = (id) => async (dispatch) =>{
    try {
        
        dispatch(getJobRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/admin/singlejob/${id}`,config)
        
        dispatch(getJobSuccess(data.job))

    } catch (error) {
        dispatch(getJobFail(error.response.data.message))
    }
}

export const updateJobData = (id,jobData) => async (dispatch) =>{
    try {
        
        dispatch(updateJobRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.put(`${API}/admin/updatejob/${id}`,jobData,config)

        dispatch(updateJobSuccess())
        dispatch(getAlljobsAdmin())
        dispatch(getJobData(id))
        toast.success('Job Updated Successfully !')
    } catch (error) {
        dispatch(updateJobFail(error.response.data.message))
    }
}

export const deleteJobData = (id) => async (dispatch) =>{
    try {
        
        dispatch(deleteJobRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
    }

     const {data} = await axios.delete(`${API}/deletejob/${id}`,config)

     dispatch(deleteJobSuccess())
     dispatch(getAlljobsAdmin())
     toast.success('Job Deleted Successfully')
    } catch (error) {
        dispatch(deleteJobFail(error.response.data.message))
    }
}