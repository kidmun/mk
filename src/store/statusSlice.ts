import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
    status: string,
    title: string,
    message: string
}

interface User {
    id: string,
    time: 0,
    transId: string,
    userName: string,
    fullName: string,
    email: string,
    phoneNo: string,
    roles: string[],
    enabled: true 
}

interface StatusState {
    notification: Notification,
    token: string,
    usersChanged: boolean,
    rolesChanged: boolean
    roles: string[],
    assigning: boolean,
    currentUser: User[]

}

const initialState: StatusState = {
    notification: {
        status: "",
        title: "",
        message: ""
    },
    token: "",
    usersChanged: false,
    rolesChanged: false,
    roles: [],
    assigning: false,
    currentUser: []
}

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        setNotification(state, action: PayloadAction<Notification>){
            state.notification = action.payload;
        },
        setToken(state, action: PayloadAction<string>){
            state.token = action.payload;
        },
        setUsersChanged(state){
            state.usersChanged = true;
        },
        setOffUsersChanged(state){
            state.usersChanged = false;
        },
        setRolesChanged(state){
            state.rolesChanged = true;
        },
        setOffRolesChanged(state){
            state.rolesChanged = false;
        },
        addRole(state, action: PayloadAction<string>){
            state.roles.push(action.payload)
        },
        setAssigning(state) {
            state.assigning = true;
        },
        turnOffAssigning(state) {
            state.assigning = false;
        },
        defaultRole(state) {
            state.roles = []
        },
        setCurrentUser (state, action: PayloadAction<User>){
            state.currentUser.push(action.payload);
        },
        defaultCurrentUser(state){
            state.currentUser = []
        }



    }
});

export const statusActions = statusSlice.actions;
export default statusSlice;