import axios from 'axios'
import {allJobsFail, allJobsRequest, allJobsSuccess, getSavedJobsRequest, getSavedJobsSuccess, jobDetailsFail, jobDetailsRequest, jobDetailsSuccess, jobSaveFail, jobSaveRequest, jobSaveSuccess, newPostFail, newPostRequest, newPostSuccess} from '../Slice/JobSlice'
import API from '../Utils/Index'
import {toast} from 'react-toastify'
import { me } from './UserAction'

export const createJobPost = (jobData) => async (dispatch)=>{
    try {
        dispatch(newPostRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.post(`${API}/create/job`,jobData,config)
        dispatch(newPostSuccess())
        toast.success('Job Posted Successfully')
    } catch (error) {
        dispatch(newPostFail(error.response.data.message))
    }
}

export const getAlljobs = () => async (dispatch) =>{
    
    try {
       
        dispatch(allJobsRequest())
        const {data} = await axios.get(`${API}/alljobs`)

        dispatch(allJobsSuccess(data.jobs))
    } catch (error) {
        dispatch(allJobsFail(error.response.data.message))
    }
}

export const getSingleJob = (id) => async (dispatch) =>{
    try {
        
        dispatch(jobDetailsRequest())
        const {data} = await axios.get(`${API}/onejob/${id}`)

        dispatch(jobDetailsSuccess(data.job))
    } catch (error) {
        dispatch(jobDetailsFail(error.response.data.message))
    }
}

export const savedJobs = (id) => async (dispatch) =>{
    try {
       
        dispatch(jobSaveRequest())

        const config = {
            headers:{
                'Content-Type':'application/json',
                Authorization: ` Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/savedjobs/${id}`,config)
         dispatch(me())
        dispatch(jobSaveSuccess())
        toast.success(data.message)
    } catch (error) {
        dispatch(jobSaveFail(error.response.data.message))
    }
}

const getSavedJobs = () => async (dispatch) =>{
    try {
       
        dispatch(getSavedJobsRequest())

        const config = {
           headers:{
            'Content-type':'application/json',
            Authorization:` Bearer ${localStorage.getItem('userToken')}`
           }
        }
          
        const {data} = await axios.get(`${API}/getsavedjobs`,config)
        dispatch(getSavedJobsSuccess(data))
    } catch (error) {
        dispatch(error.response.data.message)
    }
}