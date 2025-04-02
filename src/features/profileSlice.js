import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const createProfile=createAsyncThunk(
    'create/profile',
    async(FormData,{rejectWithValue})=>{
        try{
            
            let storedProfiles=JSON.parse(localStorage.getItem('profile'))||[];
            if(!Array.isArray(storedProfiles)){
                storedProfiles=[]
            }
            console.log(storedProfiles);
            const newProfile={
                id:FormData?.id,
                name:FormData?.name,
                address:FormData?.address,
                phone:FormData?.phone,
                gender:FormData?.gender,
                birthdate:FormData?.birthdate,
                hiredate:FormData?.hiredate,
                department:FormData?.department,
                position:FormData?.position,
                status:FormData?.status,
                image:FormData?.image,
                issuedate:'',
                expiredate:''
            }
            let checkId=storedProfiles.some(storedProfile=>{
                return String(storedProfile.id).toLowerCase().trim()===String(newProfile.id).toLowerCase().trim()
            })
            if(checkId){
                alert('profile is already registered');
                return rejectWithValue('profile is already registered');
            }
            if(!newProfile){
                alert('user is not saved');
                return rejectWithValue('user is not saved');
            }
            storedProfiles.push(newProfile);
            localStorage.setItem('profile',JSON.stringify(storedProfiles));
            alert('save successful');
        }catch(error){
            console.log(error);
            return rejectWithValue(error);
        }
    }
)

export const getProfile=createAsyncThunk(
    'get/profile',
    async(_,{rejectWithValue})=>{
        try{let storedProfiles=JSON.parse(localStorage.getItem('profile'))||[];
        if(!Array.isArray(storedProfiles)){
            storedProfiles=[];
        }
        if(storedProfiles){
            return storedProfiles;
        }
        else{
            return rejectWithValue('Failed to fetch profile');
        }}catch(error){
            return rejectWithValue(error);
        }
    }
)

export const updateProfile=createAsyncThunk(
    'profile/update',
    async({Id,FormData},{rejectWithValue})=>{
        try{
            let storedProfiles=JSON.parse(localStorage.getItem('profile'))||[];
            if(!Array.isArray(storedProfiles)){
                storedProfiles=[];
            }
            console.log(Id);
            const userIndex=storedProfiles.findIndex(storedProfile=>{
                return String(storedProfile.id).toLowerCase().trim()===String(Id).toLowerCase().trim()
            })
            if(userIndex==-1){
                alert('Match not found');
                return;
            }
            const updatedProfile={
               ...storedProfiles[userIndex],
                name: FormData?.name || storedProfiles[userIndex].name,
                gender: FormData?.gender || storedProfiles[userIndex].gender,
                birthdate: FormData?.birthdate || storedProfiles[userIndex].birthdate,
                phoneNumber: FormData?.phoneNumber || storedProfiles[userIndex].phoneNumber,
                image: FormData?.image || storedProfiles[userIndex].image,
                address: FormData?.address || storedProfiles[userIndex].address,
                hireDate: FormData?.hireDate || storedProfiles[userIndex].hireDate,
                department: FormData?.department || storedProfiles[userIndex].department,
                position: FormData?.position || storedProfiles[userIndex].position,
                status: FormData?.status || storedProfiles[userIndex].status,
                issuedate:'',
                expiredate:''
            }
            if(!updatedProfile){
                alert('Fields are empty');
                return rejectWithValue('empty field');
            }
           
            storedProfiles[userIndex]=updatedProfile;
            localStorage.setItem('profile',JSON.stringify(storedProfiles));
            alert('Update successful');
            return updatedProfile;
        }catch(error){
            return rejectWithValue(error);
        }
    }
)

export const deleteProfile=createAsyncThunk( 
    'delete/profile',
    async({Id},{rejectWithValue})=>{
        try{
            let storedProfiles=JSON.parse(localStorage.getItem('profile'))||[];
            if(!Array.isArray(storedProfiles)){
                storedProfiles=[];
            }
            console.log(Id);
            const userIndex=storedProfiles.findIndex(storedProfile=>{
                return String(storedProfile.id).toLowerCase().trim()===String(Id).toLowerCase().trim()
            })
            if(userIndex==-1){
                alert('Match not found');
                return;
            }
            storedProfiles=storedProfiles.filter(storedProfile=>{
               return String(storedProfile.id).toLowerCase().trim()!==String(Id).toLowerCase().trim()
            })
            if(!storedProfiles){
                console.log('delete unsuccessful');
            }
            localStorage.setItem('profile',JSON.stringify(storedProfiles));
            return storedProfiles;
        }catch(error){
                return rejectWithValue(error);
        }
    }
)

const profileSlice=createSlice({
    name:'Profile',
    initialState:{
        profiles: [],
        name:'',
        id:'',
        position:'',
        department:'',
        birthdate:'',
        hiredate:'',
        status:'',
        phone:'',
        address:'',
        gender:'',
        image:'',
        expiredate:'',
        issuedate:''
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createProfile.fulfilled,(state,action)=>{
                state.profiles=[...state.profiles,action.payload]
            })
            .addCase(updateProfile.fulfilled,(state,action)=>{
                state.profiles=[...state.profiles,action.payload]
            })
            .addCase(deleteProfile.fulfilled,(state,action)=>{
                state.profiles=[...state.profiles,action.payload]
            })
            
    }
    
})
export default profileSlice.reducer;