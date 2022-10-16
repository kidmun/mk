import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    notification: null,
    statusChange: false,
    changed: false,
    updating: false,
    updateId: null,
    addEditMode: false,
  },
  reducers: {
    replaceUsers(state, action) {
      state.users = action.payload.users;
    },
    addUser(state, action) {
      state.changed = true;
      state.users.push(action.payload);
    },
    removeUser(state, action) {
      state.changed = true;
      const id = action.payload.userId;
      console.log(id, state.users);

      state.users = state.users.filter(
        (user) => user.id.toString() !== id.toString()
      );
      console.log(id, state.users);
    },
    updateUsers(state, action) {
      state.changed = true;
      const id = action.payload.userId;
      console.log(id, state.notification);
      const userIndex = state.users.findIndex(
        (user) => user.id.toString() === id.toString()
      );
      state.users[userIndex] = action.payload.user;
      console.log(userIndex, state.users[0]);
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    turnOnUpdating(state) {
      state.updating = true;
    },
    turnOffUpdating(state) {
      state.updating = false;
    },
    setUpdateId(state, action) {
      state.updateId = action.payload.updateId;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
