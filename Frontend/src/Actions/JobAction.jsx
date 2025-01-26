import axios from 'axios'
import {newPostFail, newPostRequest, newPostSuccess} from '../Slice/JobSlice'
import API from '../Utils/Index'
import {toast} from 'react-toastify'

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