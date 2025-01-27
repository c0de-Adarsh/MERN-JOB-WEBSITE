import axios from "axios"
import { allAppliedJobsFail, allAppliedJobsRequest, allAppliedJobsSuccess, applicationDetailsFail, applicationDetailsRequest, applicationDetailsSuccess, createApplicantRequest, createApplicationFail, createApplicationSuccess, deleteApplicationFail, deleteApplicationRequest, deleteApplicationSuccess } from "../Slice/ApplicationSlice"
import API from "../Utils/Index"
import { toast } from "react-toastify"
import { me } from "./UserAction"

export const createApplication = (id) => async (dispatch) =>{
    try {
       
        dispatch(createApplicantRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.post(`${API}/createapplication/${id}`,config)

        dispatch(createApplicationSuccess())
        toast.success('Applied Successfully')
        dispatch(me())
    } catch (error) {
        dispatch(createApplicationFail(error.response.data.message))
        toast.error(error.response.data.message)
    }
}

export const getAppliedJobs = () => async (dispatch) =>{
    try {
       
        dispatch(allAppliedJobsRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/getallapplication`,config)

        dispatch(allAppliedJobsSuccess(data.application))
    } catch (error) {
        dispatch(allAppliedJobsFail())
    }
}

export const getSingleApplication = (id) => async (dispatch) =>{
    try {
       
        dispatch(applicationDetailsRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/singleapplication/${id}`,config)

        dispatch(applicationDetailsSuccess(data.application))
    } catch (error) {
        dispatch(applicationDetailsFail())
    }
}

export const  deleteApplication = (id) => async (dispatch) =>{
    try {
       
        dispatch(deleteApplicationRequest())
        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.delete(`${API}/deleteapplication/${id}`,config)

        dispatch(deleteApplicationSuccess())
        dispatch(getAppliedJobs())
        dispatch(me())
    } catch (error) {
        dispatch(deleteApplicationFail(error.response.data.message))
    }
}