import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { statusActions } from "../../store/statusSlice";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.status.token);
  const logoutHandler = () => {
      dispatch(statusActions.setToken(""));
      navigate('/');
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        {token.length > 0 && (
          <li>
            <Link to="add-user">Add User</Link>
          </li>
        )}
        {token.length > 0 && (
          <li>
            <Link to="roles">Roles</Link>
          </li>
        )}
        {token.length > 0 && (
          <li>
            <Link to="create-role">Add Role</Link>
          </li>
        )}
        {token.length > 0 && (
          <li>
            <Link to="permissions">Permissions</Link>
          </li>
        )}
        {token.length == 0 && (
          <li>
            <Link to="login">Login</Link>
          </li>
        )}
          {token.length > 0 && (
          <li>
            <button type="button" className="button2" onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
