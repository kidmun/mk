import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import PermissionListItem from "./PermissionsListItem";
import { statusActions } from "../../store/statusSlice";

const PermissionsList: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(statusActions.setNotification({status: '', title: "", message: ""}))
    
    }, [])
    const permissions = useSelector((state: RootState) => state.permissions.permissions);
    return <ul>
         {permissions.map(item => (<PermissionListItem key={item.id} permission={item}/>))}
    </ul>
};

export default PermissionsList;