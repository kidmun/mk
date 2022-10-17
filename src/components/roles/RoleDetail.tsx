import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Card from "../UI/Card";
import { RootState } from "../../store";
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

    interface CreateRoleProps {
        role: Role
    }

const RoleDetail: React.FC = () => {
    const [role, setRole] = useState<Role>();
    const token = useSelector((state: RootState) => state.status.token);
    const permissions = useSelector((state: RootState) => state.permissions.permissions);
    let rolePermissions = [];
    const { roleId } = useParams();
    console.log(roleId)
    useEffect(() => {
        fetch("http://localhost:3001/api/system/role?access_token=" + token + "&role_id="+roleId).then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch user data!");
              }
        
            return response.json();
        })
        .then(result => {
            console.log(result)
            setRole(result)
                  
        }).catch(err => {
            console.log(err)
        })
    
    },[])
    if (role?.permissions){
        for (const permId of role!.permissions){
            
           let permission: any = permissions.find(item => item.id === permId.id);
           if (permission){     
            console.log(permission)   
            rolePermissions.push(permission.permissionName);
           }
    
        }
        
    }
    return <Card>
        <h1>{role?.roleName}</h1>
        <p>{role?.roleName}</p>
        {rolePermissions.length > 0 ? <h2>Permissions</h2>: <h2>No Permissions</h2>}
        {rolePermissions.length > 0 && rolePermissions.map(item => (<h2>{item}</h2>))}
    </Card>

}

export default RoleDetail;