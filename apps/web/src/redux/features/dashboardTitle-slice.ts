import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    value: {
        title: string
    }
}

const initialTitle: InitialState = { value: { title: '' } }

export const dashboardTitle = createSlice({
    name: 'dashboardTitle',
    initialState: initialTitle,
    reducers: { 
        setDashboardTitle: (state, action) => {
            return {
                value: {
                    title: action.payload
                }
            }
        }
    }
})

export const { setDashboardTitle } = dashboardTitle.actions
export default dashboardTitle.reducer;