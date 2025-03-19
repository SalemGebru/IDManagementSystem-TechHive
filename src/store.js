import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/userSlice';
import profileReducer from './features/profileSlice';
import menuReducer from './features/menuSlice'



const store=configureStore({
    reducer:{
        user:userReducer,
        profile:profileReducer,
        menu:menuReducer
    }
});
export default store;