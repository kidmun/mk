import { produceWithPatches } from "immer";
import React from "react";
import './RolesListItem.css';


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

interface RolesListItemProps {
    role: Role
}    
const RolesListItem: React.FC<RolesListItemProps> = props => {
    return <article className="project">
    <header className="project__header">
      <h3 className="project__meta">
    {props.role.roleName}:{props.role.roleName}
      </h3>
      <h1 className="project__title">{props.role.roleName}</h1>
    </header>
   
  </article>


};


export default RolesListItem;
