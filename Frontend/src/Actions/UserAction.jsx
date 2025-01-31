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

import { changePasswordFail, changePasswordRequest, changePasswordSuccess, deleteAccountFail, deleteAccountRequest, deleteAccountSuccess, getMeFail, getMeRequest, getMeSuccess, isLoginFail, isLoginRequest, isLoginSuccess, loginFail, loginRequest, loginSuccess, registerFail, registerRequest, registerSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess } from "../Slice/UserSlice";
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

export const me = () => async (dispatch) => {
    try {
        // Clear any existing error first
        dispatch(getMeRequest())
        
        const token = localStorage.getItem('userToken')
        if (!token) {
            throw new Error('No auth token found')
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.get(`${API}/myaccount`, config)
        
        if (data?.user) {
            localStorage.setItem('role', data.user.role)
            dispatch(getMeSuccess(data.user))
        } else {
            throw new Error('Invalid response format')
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch user data'
        dispatch(getMeFail(errorMessage))
        console.error('ME action error:', errorMessage)
    }
}

export const changePassword = (userData) => async (dispatch) =>{
    try {
        dispatch(changePasswordRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.put(`${API}/changepassword`,config,userData)
        dispatch(changePasswordSuccess())

        toast.success('Password Changed Successfully')
    } catch (error) {
        dispatch(changePasswordFail())
        toast.error(error.response.data.message)
    }
}

export const updateProfile = (userData) => async (dispatch) =>{
    try {
        
        dispatch(updateProfileRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.put(`${API}/updateprofile`,config,userData)
        dispatch(updateProfileSuccess())
        toast.success('Profile updated successfully')
        dispatch(me())
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
        toast.error(error.response.data.message)
    }
}

export const deleteAccount = (userData) => async (dispatch) =>{
    try {
       
        dispatch(deleteAccountRequest())

        const config = {
            headers:{
                Authorization: ` Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const {data} = await axios.put(`${API}/deleteaccount`,userData,config)

        dispatch(deleteAccountSuccess())

        if(data.message === "Account Deleted"){
            toast.success('Account Deleted Successfully!')
            localStorage.removeItem('userToken')
            dispatch(logOrNot())
            dispatch(logoutClearState())
        }else{
            toast.error('Wrong Password')
        }
    } catch (error) {
        dispatch(deleteAccountFail(error.response.data.message))
        toast.error(error.response.data.message)
    }
}