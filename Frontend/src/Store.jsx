
import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Slice/UserSlice'
import jobReducer from './Slice/JobSlice'
import ApplicationReducer from './Slice/ApplicationSlice'
import AdminReducer from './Slice/AdminSlice'


export const store = configureStore({
    reducer:{
       user:userReducer,
       job:jobReducer,
       application:ApplicationReducer,
       admin:AdminReducer
    }
})