import React from "react";

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

const RoleDetail: React.FC<CreateRoleProps> = (props) => {
    return <div>
        <h1>Role Detail</h1>
        <p>{props.role.roleName}</p>
    </div>

}

export default RoleDetail;