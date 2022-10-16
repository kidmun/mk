import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import roleSlice from "./roleSlice";
import permissionSlice from "./permissionSlice";
import statusSlice from "./statusSlice";


export const store = configureStore({
    reducer: {
            users: userSlice.reducer,
            roles: roleSlice.reducer,
            permissions: permissionSlice.reducer,
            status: statusSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch