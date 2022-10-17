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
    return <Card>
        <h1>{role?.roleName}</h1>
        <p>{role?.roleName}</p>
    </Card>

}

export default RoleDetail;