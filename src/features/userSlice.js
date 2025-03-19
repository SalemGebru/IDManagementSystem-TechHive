import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { Form } from "react-router";



export const signin=createAsyncThunk(
    'user/signin',
    async(FormData,{rejectWithValue})=>{
        try{
            const userData = JSON.parse(localStorage.getItem('user'));

            if (!userData) {
                return rejectWithValue('No user found in localStorage');
            }
            
            if(FormData.email===userData.email){
                if(FormData.password===userData.password){
                    alert('Login successful');
                    return { email: userData.email, message: 'Login successful' };
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
                return rejectWithValue(error);
        }
    }
)

export const addUser = createAsyncThunk(
    'user/add',
    async (FormData, {  rejectWithValue }) => {
        let userId;
        try {
            console.log('Trying to add user...');
            let storedUsers = JSON.parse(localStorage.getItem('userdata')) || [];
            if (!Array.isArray(storedUsers)) {
                storedUsers = []; 
            }
            if (storedUsers.length === 0) {
                console.log('No user');
                let lastUserId=0;
                userId=lastUserId+1;
            } else {
                const lastUser = storedUsers.pop();
                if (lastUser && lastUser.id) {
                    let lastUserId = lastUser.id;
                    console.log("Last user's id:", lastUserId);
                     lastUserId=parseInt(lastUserId,10);
                      userId=lastUserId+1;
                      
                } else {
                    let lastUserId=0;
                    userId=lastUserId+1;
                }
                storedUsers.push(lastUser);
            }
            console.log('User id',userId);
            const user = {
                id: userId || "",
                username: FormData?.username || "",
                email: FormData?.email || "",
                role: FormData?.role || "",
                password: FormData?.password || "",
                image: FormData?.image || "",
            };

            console.log("User to be added:", user);

            
            const isUserRegistered=storedUsers.some(storedUser => {
                console.log(storedUser.email);
                if(storedUser.email===user.email){
                    alert('User is already registerd');
                    return;
                }
            });
            console.log(isUserRegistered)

            if(isUserRegistered){
                alert('User is already registered');
                return;
            }

            storedUsers.push(user); 
            console.log(storedUsers);
            localStorage.setItem('userdata', JSON.stringify(storedUsers)); 

            console.log('User successfully added:', user);
            return user;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/add',
    async (FormData, {  rejectWithValue }) => {
        
    });



const userSlice=createSlice({
    name:'User',
    initialState:{
        username:'',
        email:'',
        password:'',
        name:'',
        role:'',
        id:1,
        users:[],
        logged:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(signin.fulfilled,(state)=>{
            state.logged=true;
        })
        .addCase(signin.rejected,(state)=>{
            state.logged=false;
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.users=[...state.users,action.payload]
            console.log(state.users);
        })
    }
})

export default userSlice.reducer;