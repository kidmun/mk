import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { RootState } from "../../store";
import './Navigation.css';

const Navigation: React.FC = () => {
  const token = useSelector((state: RootState) => state.status.token);
    return <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>

      </li>

{token.length > 0 && <li>
       <Link to="add-user">Add User</Link>
      </li> }     
      {token.length > 0 &&  <li>
        <Link to="roles">Roles</Link>
      </li>}
      {token.length > 0 &&<li>
        <Link to="create-role">Add Role</Link>
      </li>}
      {token.length > 0 && <li>
        <Link to="permissions">Permissions</Link>
      </li>}
      {token.length == 0 &&<li>
        <Link to="login">Login</Link>
      </li>}
    </ul>
  </nav>
};

export default Navigation;