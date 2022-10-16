import React from "react";
import {  useSelector } from "react-redux";
import { RootState } from "../../store";
import RolesListItem from "./RolesListItem";


const RolesList: React.FC = () => {

    

    const roles = useSelector((state: RootState) => (state.roles.roles));
    return <React.Fragment>
    <ul>
        {roles.map(item => (<RolesListItem key={item.id} role={item}/>))}
    </ul>
    
    
    </React.Fragment>
};

export default RolesList;