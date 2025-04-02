import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

export const getProfile=createAsyncThunk(
    'profile/get',
    async({Id},{rejectWithValue})=>{
        try{
            let storedProfiles=JSON.parse(localStorage.getItem('profile'))||[];
            if(!Array.isArray(storedProfiles)){
                storedProfiles=[]
            }
            const profile=storedProfiles.find((storedProfile)=>{
                return String(storedProfile.id).toLowerCase().trim()===String(Id).toLowerCase().trim()
            })
            console.log(profile)
            return profile
        }catch(error){
            console.log(error);
            return rejectWithValue(error);
        }
    }
)

export const generateId=createAsyncThunk(
    'id/create',
    async({Id,UserInfo,FormData},{rejectWithValue})=>{
        try{
            console.log('trying')
            let storedProfiles=JSON.parse(localStorage.getItem('profile'))||[];
            if(!Array.isArray(storedProfiles)){
                storedProfiles=[]
            }
            const userIndex=storedProfiles.findIndex((storedProfile)=>{
                return String(storedProfile.id).toLowerCase().trim()===String(Id).toLowerCase().trim()
            })
            console.log(userIndex)
            const updatedProfile={
                id:Id,
                name:UserInfo?.name,
                position:UserInfo?.position,
                department:UserInfo?.department,
                birthdate:UserInfo?.hiredate,
                hiredate:UserInfo?.hiredate,
                status:"Active",
                phone:UserInfo?.phone,
                address:UserInfo?.address,
                gender:UserInfo?.gender,
                image:UserInfo?.image,
                expiredate:FormData?.expiredate,
                issuedate:FormData?.issuedate,
            }
            const newId={
                name:UserInfo?.name,
                position:UserInfo?.position,
                expiredate:FormData?.expiredate,
                issuedate:FormData?.issuedate,
                phone:UserInfo?.phone,
                address:UserInfo?.address,
            }
            console.log(updatedProfile)
            storedProfiles[userIndex]=(updatedProfile);
            console.log(updatedProfile)
            localStorage.setItem('profile',JSON.stringify(storedProfiles))
            localStorage.setItem('idcard',JSON.stringify(newId));
            console.log(newId);
            console.log(storedProfiles)
            console.log('saved');
            return updatedProfile
        }catch(error){

        }
    }
)

export const saveTemplate=createAsyncThunk(
    'template/save',
    async({TemplateData},{rejectWithValue})=>{
        try{
            console.log('trying');
            localStorage.setItem('templates',JSON.stringify(TemplateData));
            console.log('template saved');
            console.log(TemplateData)
            return TemplateData
        }catch(error){
            console.log(error);
            return rejectWithValue(error.message)
        }
    }
)

export const getTemplate = createAsyncThunk(
    'template/get',
    async (_, { rejectWithValue }) => {
      try {
        // Get templates from localStorage
        const storedTemplates = localStorage.getItem('templates');
  
        // If no templates exist, return an empty object
        if (!storedTemplates) {
          return {};  // Return empty object if no templates are found
        }
  
        const templates = JSON.parse(storedTemplates);
  
        // Ensure the templates are in the correct format (object)
        if (typeof templates !== 'object' || Array.isArray(templates)) {
          return rejectWithValue('Invalid template format in localStorage');
        }
  
        return templates;  // Return the valid templates object
      } catch (error) {
        // Return a string error message if parsing fails
        return rejectWithValue(error.message || 'Failed to load templates');
      }
    }
  );

const idSlice=createSlice({
    name:'idSlice',
    initialState:{
        idCards:[],
        issuedate:'',
        expiredate:'',
        templates:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(generateId.fulfilled,(state,action)=>{
                state.idCards=[...state.idCards,action.payload]
            })
            .addCase(saveTemplate.fulfilled,(state,action)=>{
                state.templates=[...state.templates,action.payload]
            })

    }
    
}
)
export default idSlice.reducer