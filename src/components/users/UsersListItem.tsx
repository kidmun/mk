import React from "react";

import { useNavigate } from "react-router-dom";
import './Project.css'

interface User {
    id: string,
    time: 0,
    transId: string,
    userName: string,
    fullName: string,
    email: string,
    phoneNo: string,
    roles: string[],
    enabled: true 
}

interface UsersListItemProps{
    user: User
}


const UsersListItem: React.FC<UsersListItemProps> = props => {
 

  const navigate = useNavigate();
  const userDetailHandler = () => {
    navigate('/users/'+ props.user.id)
  }
return <article className="project">
    <header className="project__header">
      <h3 className="project__meta">
    {props.user.userName}:{props.user.phoneNo}
      </h3>
      <h1 className="project__title">{props.user.fullName}</h1>
    </header>
   
    <br/>
    <div className="project__content">{props.user.phoneNo}</div>
    
    <div className="project__actions">
    <button type="button">Update</button>
    <button type="button" onClick={userDetailHandler}>Detail</button>
    </div>
  </article>
};

export default UsersListItem;

