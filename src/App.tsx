import React,{ useEffect } from "react";
import { RootState } from "./store/index";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/userSlice";
import "./App.css";
import { roleActions } from "./store/roleSlice";
import { permissionAction } from "./store/permissionSlice";
import UsersList from "./components/users/UsersList";
import RolesList from "./components/roles/RolesList";
import PermissionsList from "./components/permissions/PermissionsList";
import Notification from "./components/UI/Notification";
import AddUser from "./components/users/AddUser";
import CreateRole from "./components/roles/CreateRole";
import RoleDetail from "./components/roles/RoleDetail";
import UserDetail from "./components/users/UserDetail";
import Login from "./components/auth/Login";
import Navigation from "./components/navigation/Navigations";
import { Routes, Route } from "react-router-dom";
import { fetchUsers } from "./store/userActions";
import { statusActions } from "./store/statusSlice";
import { fetchRoles } from './store/roleActions';
import { fetchPermissions } from './store/permissionActions';
import   UpdateUser  from './components/users/UpdateUser';
import AssignRole from './components/roles/AssignRole'

let Initial = true;
interface User {
  id: string;
  time: 0;
  transId: string;
  userName: string;
  fullName: string;
  email: string;
  phoneNo: string;
  roles: string[];
  enabled: true;
}

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(
    (state: RootState) => state.status.notification
  );
  const users = useSelector((state: RootState) => state.users.users);
  const token = useSelector((state: RootState) => state.status.token); 
  const changed = useSelector((state: RootState) => state.status.usersChanged)
  console.log(users, token)
  useEffect(() => {
    if (changed){
      dispatch(fetchUsers(token));

      dispatch(fetchRoles(token))
      dispatch(fetchPermissions(token))
      dispatch(statusActions.setOffUsersChanged())
    }
    
  }, [changed]);



  return (
    <React.Fragment>
      <Navigation />
      {notification.status.length !== 0 && <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />}
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/roles" element={<RolesList />} />
        <Route path="/create-role" element={<CreateRole />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update-user/:userId" element={<UpdateUser />} />
        <Route path="/assign-role/:userId" element={<AssignRole />} />
        <Route
          path="/roles/:roleId"
          element={
            <RoleDetail/>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <UserDetail/>
          }
        />
        <Route path="/permissions" element={<PermissionsList />} />
      </Routes>
     
    </React.Fragment>
  );
}

export default App;
