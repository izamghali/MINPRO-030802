import { configureStore } from '@reduxjs/toolkit';
import pageNavReducer from './features/pageNavigation-slice';
import dashboardTitleReducer from './features/dashboardTitle-slice';
import authReducer from './features/auth-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector

export const store = configureStore({ // creating redux store
    reducer: {
        pageNavReducer, dashboardTitleReducer, authReducer
    }
})