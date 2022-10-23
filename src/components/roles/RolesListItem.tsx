import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./RolesListItem.css";
import { statusActions } from "../../store/statusSlice";

interface Permission {
  id: string;
  transId: string;
  permissionName: string;
  permissionKey: string;
}
interface Role {
  id: string;
  key: string;
  roleName: string;
  permissions: Permission[];
}

interface RolesListItemProps {
  role: Role;
}
const RolesListItem: React.FC<RolesListItemProps> = (props) => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState<boolean>(true);
  const navigate = useNavigate();
  const userDetailHandler = () => {
    navigate("/roles/" + props.role.id);
  };
  const assignHandler = (roleId: string) => {
    setShowButton(false);
    console.log(roleId);
    dispatch(statusActions.addRole(roleId));
  };
  const finishAssignHandler = () => {
    dispatch(statusActions.setAssigning());

    navigate("/");
  };
  return (
    <article className="project">
      <header className="project__header">
        <h3 className="project__meta">
          {props.role.roleName}:{props.role.roleName}
        </h3>
        <h1 className="project__title">{props.role.roleName}</h1>
      </header>
      <button type="button" className="button1" onClick={userDetailHandler}>
        Detail
      </button>
      {showButton && (
        <button
          type="button"
          className="button"
          onClick={assignHandler.bind(this, props.role.id)}
        >
          Assign
        </button>
      )}
      {!showButton && (
        <button type="button" className="button" onClick={finishAssignHandler}>
          Finish Assign
        </button>
      )}
    </article>
  );
};

export default RolesListItem;
