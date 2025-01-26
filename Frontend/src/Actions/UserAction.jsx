// import { registerFail, registerRequest, registerSuccess } from "../Slice/UserSlice"
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import API from "../Utils/Index"
// export const registerUser = (userData) =>async(dispatch) => {
     
//     try {
        
//         dispatch(registerRequest())

//         const {data} = await axios.post(`${API}/signup`,userData);

//         dispatch(registerSuccess())
//         localStorage.setItem('UserToken',data.token)
//         toast.success("Registration Successfull")
//     } catch (error) {
//         dispatch(registerFail(error.response.data.message))
//         if(error.response.data.message.includes('duplicate')){
//             toast.error('User already exist')
//         } else{
//             toast.error(error.response.data.message)
//         }
//     }
// }

import { getMeFail, getMeRequest, getMeSuccess, isLoginFail, isLoginRequest, isLoginSuccess, loginFail, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess } from "../Slice/UserSlice";
import axios from 'axios';
import { toast } from 'react-toastify';
import API from "../Utils/Index";

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(registerRequest());

        // Create FormData instance
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('skills', userData.skills.join(" , "));  // Skills as string
        formData.append('avatar', userData.avatar);  // avatar file (raw file)
        formData.append('resume', userData.resume);  // resume file (raw file)

        // Set headers for file upload
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        // Send the request with FormData
        const { data } = await axios.post(`${API}/signup`, formData, config);

        dispatch(registerSuccess());
        dispatch(isLoginSuccess(true))
        localStorage.setItem('UserToken', data.token);
        toast.success("Registration Successful");

    } catch (error) {
        dispatch(registerFail(error.response.data.message));

        if (error.response.data.message.includes('duplicate')) {
            toast.error('User already exists');
        } else {
            toast.error(error.response.data.message);
        }
    }
};

export const loginUser = (userData) => async (dispatch) =>{
    try {
        
        dispatch(loginRequest())

        const {data} = await axios.post(`${API}/login`,userData)
        dispatch(loginSuccess())
        localStorage.setItem('userToken',data.token)
        dispatch(logOrNot())
        dispatch(me())
        toast.success('Login Successfully')
       
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
        toast.error(error.response.data.message)
    }
}

export const logOrNot = () => async (dispatch) =>{
    try {
        
        dispatch(isLoginRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/islogin`,config)
        dispatch(isLoginSuccess(data.isLogin))
    } catch (error) {
       dispatch(isLoginFail(error.response.data.message))   
    }
}

export const me = () => async (dispatch) =>{
    try {
        
        dispatch(getMeRequest())
        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.get(`${API}/myaccount`,config)
        localStorage.setItem('role',data.role)
        dispatch(getMeSuccess(data.role))
        console.log(data.role)
    } catch (error) {
        dispatch(getMeFail(error.response.data.message))
    }
}