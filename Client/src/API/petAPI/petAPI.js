import { commonrequest } from "../commonrequest"
import {BASE_URL} from "../helper"



export const postAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/api/pets`,data,header,"")
}

export const getPetsAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/api/pets`,data,header,"")
}

export const deletePetAPI = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/api/pets/${data}`,{},header,"")
}

export const updatePetAPI = async(data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/api/pets/${data[1]}`,data[0],header,"")
}