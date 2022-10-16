import React from "react";
import { NavLink, Link } from "react-router-dom";
import './Navigation.css';

const Navigation: React.FC = () => {
    return <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>

      </li>
<li>
        <Link to="add-user">Add User</Link>
      </li>      
      <li>
        <Link to="roles">Roles</Link>
      </li>
      <li>
        <Link to="create-role">Add Role</Link>
      </li>
      <li>
        <Link to="permissions">Permissions</Link>
      </li>
      <li>
        <Link to="login">Login</Link>
      </li>
    </ul>
  </nav>
};

export default Navigation;