import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

interface Permission {
    id: string,
    transId: string,
    permissionName: string,
    permissionKey: string
}

interface Role {
id: string,
key: string,
roleName: string,
permissions: Permission[]

}
interface RolesState {
    roles: Role[]
} 

const initialState: RolesState = {
    roles: []
} 
const roleSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        replaceRoles(state, action: PayloadAction<Role[]>){
            state.roles = action.payload;
        },
        addRole(state, action: PayloadAction<Role>){
            state.roles.push(action.payload);
        }
    }

});

export const roleActions = roleSlice.actions;
export default roleSlice;