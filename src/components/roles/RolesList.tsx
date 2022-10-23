import React, { useEffect } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { statusActions } from "../../store/statusSlice";
import RolesListItem from "./RolesListItem";


const RolesList: React.FC = () => {
    
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(statusActions.setNotification({status: '', title: "", message: ""}))
    
    }, [])
    const roles = useSelector((state: RootState) => (state.roles.roles));
   
    return <React.Fragment>
    <ul>
        {roles.map(item => (<RolesListItem key={item.id} role={item}/>))}
    </ul>
    
    
    </React.Fragment>
};

export default RolesList;