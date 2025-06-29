import { createSlice } from "@reduxjs/toolkit";
import reducer from "./moviesSlice";

const configSlice = createSlice({
    name:"config",
    initialState:{
        lang:"en"
    },
    reducers:{
        changeLanguage:(state , action) =>{
            state.lang = action.payload;
        },
    },
})

export const {changeLanguage} = configSlice.actions;

export default configSlice.reducer