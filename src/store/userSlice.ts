import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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

interface UsersState {
    users: User[]
}
const initialState: UsersState = {
    users: []
}
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        replaceUsers(state, action: PayloadAction<User[]>){
            state.users = action.payload;
        },
        addUser(state, action: PayloadAction<User>){
            state.users.push(action.payload);
        }
    }
});
export const userActions = userSlice.actions;
export default userSlice;
