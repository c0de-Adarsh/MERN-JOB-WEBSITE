
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Slice/UserSlice'
import jobReducer from './Slice/JobSlice'


export const store = configureStore({
    reducer:{
       user:userReducer,
       job:jobReducer
    }
})