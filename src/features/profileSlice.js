import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { Form } from "react-router";

export const updateProfile=createAsyncThunk(
    'update/profile',
    async(FormData,{rejectWithValue})=>{
        try{
           const updatedProfile={
                name:FormData.name,
                gender:FormData.gender,
                birthdate:FormData.birthdate,
                cellphone:FormData.cellphone,
                image:FormData.image
            }
            if(updatedProfile!=''){
                localStorage.setItem('profile',JSON.stringify(updatedProfile));
                return updatedProfile;
            }
            else{
                alert('Fields are empty');
                return rejectWithValue('empty field');
            }
        }catch(error){
            alert('Update failed');
            return rejectWithValue(error);
        }
    }
)

export const getProfile=createAsyncThunk(
    'get/profile',
    async(_,{rejectWithValue})=>{
        try{
            const profile=localStorage.getItem('profile');
            if(profile){
                return JSON.parse(profile);
            }
            return rejectWithValue('retrieval failed');
        }catch(error){
            return rejectWithValue(error);
        }
    }
)

const profileSlice=createSlice({
    name:'profile',
    initialState:{
        profile:{
            name:'',
            gender:'',
            birthdate:'',
            cellphone:'',
            image:''
        },
      
    },
    reducers:{}
})
export default profileSlice.reducer;
