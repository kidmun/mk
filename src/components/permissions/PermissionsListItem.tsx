import React from "react";
import "./PermissionsListItem.css";

interface Permission {
  id: string;
  transId: string;
  permissionName: string;
  permissionKey: string;
}

interface PermissionListItemProps {
  permission: Permission;
}

const PermissionListItem: React.FC<PermissionListItemProps> = (props) => {
  return (
    <article className="project">
      <header className="project__header">
        <h3 className="project__meta">{props.permission.permissionName}</h3>
      </header>
    </article>
  );
};

export default PermissionListItem;
