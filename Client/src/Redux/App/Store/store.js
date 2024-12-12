import { configureStore } from "@reduxjs/toolkit";
import  petSlice  from "../../Slice/PetSlice/petSlice";
import  userSlice  from "../../Slice/UserSlice/userSlice";

export const store = configureStore({
    reducer:{
     Pet:petSlice,
     User:userSlice
    }
})