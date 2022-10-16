import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Permission {
    id: string,
    transId: string,
    permissionName: string,
    permissionKey: string
}

interface PermissionsState {
    permissions: Permission[]
}

const initialState: PermissionsState = {
    permissions: []
} 

const permissionSlice = createSlice({
    name: "permissions",
    initialState,
    reducers: {
        replacePermission(state, action: PayloadAction<Permission[]>){
            state.permissions = action.payload;
        },
        addPermission(state, action: PayloadAction<Permission>){
            state.permissions.push(action.payload);
        }
    }
});

export const permissionAction = permissionSlice.actions;
export default permissionSlice;