import {createSlice,createAsyncThunk}  from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import { userloggedinAPI, userloginAPI, userlogoutAPI, userRegisterAPI } from "../../../API/userAPI/usersApi"



export const userRegister = createAsyncThunk("userregsiter",async(data)=>{
    try {
  
        const response = await userRegisterAPI(data);

        if(response.status == 200){
            toast.success("user is Registered");
            return response.data
        }else{
           toast.error(response.response.data.error)
        }
        
    } catch (error) {
        throw error
    }
})

export const userLogin = createAsyncThunk("userlogin",async(data)=>{
    try {
  
        const response = await userloginAPI(data);

        if(response.status == 200){
            toast.success("user is loggin");
            localStorage.setItem("userToken",response.data.token);
            return response.data
        }else{
           toast.error(response.response.data.error)
        }
        
    } catch (error) {
        throw error
    }
})

export const userVerify = createAsyncThunk("userverify",async()=>{
    try {
         
        const response = await userloggedinAPI();
        if(response.status == 200){
            return response.data;
        }else{
            console.log("error");
        }

    } catch (error) {
        throw error
    }
})


export const userLogout = createAsyncThunk("userlogout",async()=>{
    try {

        const response = await userlogoutAPI();
        if(response.status == 200){
            toast.success("user is logout");
            localStorage.removeItem("userToken");
            return response.data
        }else{
            localStorage.removeItem("userToken")
        }
        
    } catch (error) {
        throw error
    }
})






export const userSlice = createSlice({
    name:"userslice",
    initialState:{
        userregister:[],
        userlogin:[],
        userloggedin:[],
        userlogout:[],
        error:null,
        loader:false
    },
    extraReducers:(builders)=>{

        builders.addCase(userRegister.pending,(state)=>{
            state.loader = true
        })
        .addCase(userRegister.fulfilled,(state,action)=>{
            state.loader = false;
            state.userregister = [action.payload]
        })
        .addCase(userRegister.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })

        builders.addCase(userLogin.pending,(state)=>{
            state.loader = true
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.loader = false;
            state.userlogin = [action.payload]
        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })

       
         builders.addCase(userVerify.pending,(state)=>{
            state.loader = true
        })
        .addCase(userVerify.fulfilled,(state,action)=>{
            state.loader = false;
            state.userloggedin = [action.payload]
        })
        .addCase(userVerify.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })


         
        builders.addCase(userLogout.pending,(state)=>{
            state.loader = true
        })
        .addCase(userLogout.fulfilled,(state,action)=>{
            state.loader = false;
            state.userloggedin = [];
            state.userlogout = [action.payload];
            state.userlogin=[];
        })
        .addCase(userLogout.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })

    
    
    }
})


export default userSlice.reducer