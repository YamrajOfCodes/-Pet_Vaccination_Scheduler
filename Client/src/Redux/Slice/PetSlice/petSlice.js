import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deletePetAPI, getPetsAPI, postAPI, updatePetAPI } from "../../../API/petAPI/petAPI";
import toast from "react-hot-toast";



export const addPet = createAsyncThunk("addinfo",async(data)=>{
    try {
        const response = await postAPI(data)
        if(response.status == 200){
            toast.success("Pet added succcessfully")
            return response.data;
        } 
    } catch (error) {
        console.log(error);
        
    }
})


export const getPets = createAsyncThunk("getallpets",async(data)=>{
    try {
        const response = await getPetsAPI()
        if(response.status == 200){
            return response.data;
        } 
    } catch (error) {
        console.log(error);
        
    }
})



export const deletePet = createAsyncThunk("Deltepet",async(data)=>{
    try {
        const response = await deletePetAPI(data)
        if(response.status == 200){
            toast.success("deleted successfully")
            return response.data;
        } 
    } catch (error) {
        console.log(error);
        
    }
})


export const updatePet = createAsyncThunk("updatePet",async(data)=>{
    try {
        console.log(data);
        
        const response = await updatePetAPI([data.input,data.id])
        if(response.status == 200){
            toast.success(response.data.message)
            return response.data;
        } 

    
        
    } catch (error) {
        console.log(error);
        
    }
})










export const petSlice = createSlice({
    name:"petslice",
    initialState:{
        addpet:[],
        getpets:[],
        removepet:[],
        updatepet:[],
        error:null,
        loader:false
    },
    extraReducers:(builders)=>{
        builders.addCase(addPet.pending,(state)=>{
            state.loader = true
        })
        .addCase(addPet.fulfilled,(state,action)=>{
            state.loader = false;
            state.addpet = [action.payload]
        })
        .addCase(addPet.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })
        // getallpets
        builders.addCase(getPets.pending,(state)=>{
            state.loader = true
        })
        .addCase(getPets.fulfilled,(state,action)=>{
            state.loader = false;
            state.getpets = [action.payload]
        })
        .addCase(getPets.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })

        // deletepet

        builders.addCase(deletePet.pending,(state)=>{
            state.loader = true
        })
        .addCase(deletePet.fulfilled,(state,action)=>{
            state.loader = false;
            state.removepet = [action.payload]
        })
        .addCase(deletePet.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })

        //updatepet

        builders.addCase(updatePet.pending,(state)=>{
            state.loader = true
        })
        .addCase(updatePet.fulfilled,(state,action)=>{
            state.loader = false;
            state.updatepet = [action.payload]
        })
        .addCase(updatePet.rejected,(state,action)=>{
            state.loader = false;
            state.error [action.payload]
        })
    }
})

export default petSlice.reducer;