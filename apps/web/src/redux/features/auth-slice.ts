import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    value: {
        currentAccount: any
    }
}

const initialState: InitialState = {
    value: { 
        currentAccount: {},
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: { 
        setCurrentAccount: (state, action) => {
            return {
                value: {
                    currentAccount: action.payload
                }
            }
        },
    }
})


export const { setCurrentAccount } = authSlice.actions
export default authSlice.reducer;