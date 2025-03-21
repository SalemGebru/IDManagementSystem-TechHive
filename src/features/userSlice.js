import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { Form } from "react-router";



export const signin=createAsyncThunk(
    'user/signin',
    async(FormData,{rejectWithValue})=>{
        try{
            let userData = JSON.parse(localStorage.getItem('userdata'));

            if (!userData) {
                return rejectWithValue('No user found in localStorage');
            }

            const userFound=userData.find(user=>String(user.email).trim()===FormData.email);
            if(userFound){
                if(String(userFound.password).trim()===FormData.password){
                    alert('Login successful');
                    return { role: userFound.role, message: 'Login successful' };
                }
                else{
                    alert('Incorrect password');
                    return rejectWithValue('password mismatch');
                }
            }   
            else{
                alert('Email not found');
                return rejectWithValue('email not found');
            }
        }catch(error){
                return rejectWithValue(error);
        }
    }
);

export const getUser=createAsyncThunk(
    'user/get',
    async(_,{rejectWithValue})=>{
        try{
            const userData = JSON.parse(localStorage.getItem('userdata'));

            if (!userData) {
                return rejectWithValue('No user found in localStorage');
            }
            else{
               
                return userData;
            }
        }catch(error){
                return rejectWithValue(error.message);
        }
    }
)

export const addUser = createAsyncThunk(
    'user/add',
    async (FormData, {  rejectWithValue }) => {
        let userId;
        try {
            let storedUsers;
            try {
                storedUsers = JSON.parse(localStorage.getItem('userdata')) || [];
            } catch (e) {
                storedUsers = [];
            }
            
            if (!Array.isArray(storedUsers)) {
                storedUsers = []; 
            }
            console.log(storedUsers);
            if (storedUsers.length === 0) {
                let lastUserId=0;
                userId=lastUserId+1;
            } else {
                const lastUser = storedUsers.pop();
                if (lastUser && lastUser.id) {
                    let lastUserId = lastUser.id;
                     lastUserId=parseInt(lastUserId,10);
                      userId=lastUserId+1;
                      
                } else {
                    let lastUserId=0;
                    userId=lastUserId+1;
                }
                storedUsers.push(lastUser);
            }
            const user = {
                id: userId || "",
                username: FormData?.username || "",
                email: FormData?.email || "",
                role: FormData?.role || "",
                password: FormData?.password || "",
                image: FormData?.image || "",
                status:"Active"
            };            
            const isUserRegistered = storedUsers.some(storedUser => {
                return storedUser.email.some(storedEmail => {                    
                    if (storedEmail.toLowerCase().trim() === String(user.email).toLowerCase().trim()) {
                        return true; 
                    }
                    return false;
                });
            });

            if(isUserRegistered){
                alert('Email is already taken');
                return;
            }
            storedUsers.push(user); 
            localStorage.setItem('userdata', JSON.stringify(storedUsers)); 
            alert('User successfully added:', user);
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async ({ Id, FormData }, { rejectWithValue }) => {
        let storedUsers = JSON.parse(localStorage.getItem('userdata')) || [];
        if (!Array.isArray(storedUsers)) {
            storedUsers = []; 
        }
        try {
            const userIndex = storedUsers.findIndex(storedUser => {
                return String(storedUser.id).trim() === String(Id).trim();  
            });
            if (userIndex === -1) {
                return rejectWithValue('User not found');
            }
            const updatedUser = {
                ...storedUsers[userIndex], 
                username: FormData?.username || storedUsers[userIndex].username,
                email: FormData?.email || storedUsers[userIndex].email,
                role: FormData?.role || storedUsers[userIndex].role,
                password: FormData?.password || storedUsers[userIndex].password,
                image: FormData?.image || storedUsers[userIndex].image,
            };
            
            storedUsers[userIndex] = updatedUser;
            localStorage.setItem('userdata', JSON.stringify(storedUsers));
            alert('Update successful');

            return updatedUser;
        } catch (error) {
            return rejectWithValue(error.message || 'Update failed');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (Id, { rejectWithValue }) => {
        try {
            let storedUsers = JSON.parse(localStorage.getItem('userdata')) || [];
            storedUsers = storedUsers.filter(storedUser => { 
                return storedUser.id !== Id.id; 
            });

            localStorage.setItem('userdata', JSON.stringify(storedUsers));
            alert('Delete successful');
            return storedUsers; 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBunch=createAsyncThunk(
    'user/deletebunch',
    async(id,{rejectWithValue})=>{
        try{
            let storedUsers = JSON.parse(localStorage.getItem('userdata')) || [];
            let userIdToRemove = Object.keys(id).map(Number);
            storedUsers=storedUsers.filter(storedUser=>{
                
                return !userIdToRemove.includes(storedUser.id)
            }
 )
            localStorage.setItem('userdata', JSON.stringify(storedUsers));
            alert('Delete successful');
            return storedUsers
        }catch(error){
            return rejectWithValue(error);
        }
    }
)



const userSlice=createSlice({
    name:'User',
    initialState:{
        username:'',
        email:'',
        password:'',
        name:'',
        role:'',
        id:1,
        status:'',
        users:[],
        logged:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(signin.fulfilled,(state,action)=>{
            state.logged=true;
            state.role = action.payload.role;
        })
        .addCase(signin.rejected,(state)=>{
            state.logged=false;
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.users=[...state.users,action.payload]
            
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.users=[...state.users,action.payload]
            
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.users=[...state.users,action.payload];
        })
        .addCase(deleteBunch.fulfilled,(state,action)=>{
            state.users=[...state.users,action.payload];
        })
    }
})

export default userSlice.reducer;