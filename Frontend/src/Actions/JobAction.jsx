
import {newPostRequest} from '../Slice/JobSlice'

const createJobPost = (jobData) => async (dispatch)=>{
    try {
        dispatch(newPostRequest())
    } catch (error) {
        
    }
}