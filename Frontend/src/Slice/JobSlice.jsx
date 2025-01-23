import { createSlice } from "@reduxjs/toolkit";



 const JobSlice = createSlice({
    name:'job',
    initialState:{
        loading:false,
        saveJobLoading:false,
        error:null,
        jobDetails:{
            __v:0,
            _id:"",
            category:"",
            companyLogo:{
                public_id:"",
                url:""
            },
            companyName:"",
            createdAt:"",
            description:"",
            employmentType:"",
            experience:"",
            location:"",
            postedBy:"",
            salary:"",
            skillsRequired:[],
            status:"",
            title:""
        },
        savedJobs:[],
        allJobs: []
    },
    reducers:{
        
    }
 })