import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PermissionListItem from "./PermissionsListItem";

const PermissionsList: React.FC = () => {
    const permissions = useSelector((state: RootState) => state.permissions.permissions);
    return <ul>
         {permissions.map(item => (<PermissionListItem key={item.id} permission={item}/>))}
    </ul>
};

export default PermissionsList;