import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: {
        isAuth: boolean
    }
}

const initialState: InitialState = {
    value: { // value of who is authenticated
        isAuth: false, // 
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { // collection of reducers of authSlice
        testAuth: () => {
            return initialState;
        }
    }
})