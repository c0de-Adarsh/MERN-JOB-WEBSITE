import { registerFail, registerRequest, registerSuccess } from "../Slice/UserSlice"
import axios from 'axios'
import { toast } from 'react-toastify'
import API from "../Utils/Index"
export const registerUser = (userData) =>async(dispatch) => {
     
    try {
        
        dispatch(registerRequest())

        const {data} = await axios.post(`${API}/signup`,userData);

        dispatch(registerSuccess())
        localStorage.setItem('UserToken',data.token)
        toast.success("Registration Successfull")
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
        if(error.response.data.message.includes('duplicate')){
            toast.error('User already exist')
        } else{
            toast.error(error.response.data.message)
        }
    }
}

