import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: {
        current: string
    }
}

const initialState: InitialState = {
    value: { 
        current: '', 
    }
}

export const pageNavigation = createSlice({
    name: 'pageNavigation',
    initialState: initialState,
    reducers: { 
        setPath: (state, action) => {
            return {
                value: {
                    current: action.payload
                }
            }
        },
    }
})



export const { setPath } = pageNavigation.actions
export default pageNavigation.reducer;