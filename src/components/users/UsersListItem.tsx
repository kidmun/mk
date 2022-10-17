import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { statusActions } from "../../store/statusSlice";
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
  const assinging = useSelector((state: RootState) => state.status.assigning);
  const dispatch = useDispatch();
 

  const navigate = useNavigate();
  const userDetailHandler = () => {
    navigate('/users/'+ props.user.id)
  }
  const userUpdateHandler = () => {
    navigate('/update-user/'+ props.user.id)
  }
  const assignHandler = (userId: string) => {
    navigate('/assign-role/'+ userId)
    dispatch(statusActions.turnOffAssigning());
  };
return <article className="project">
    <header className="project__header">
      <h3 className="project__meta">
    UserName:{props.user.userName}
      </h3>
      <h1 className="project__title">{props.user.fullName}</h1>
      {assinging && <button type="button" className="button" onClick={assignHandler.bind(this, props.user.id)}>Assign</button>}
    </header>
   
    <br/>
 
    
    <div className="project__actions">
    <button type="button" className="button" onClick={userUpdateHandler}>Update</button>
    <button type="button" className="button" onClick={userDetailHandler}>Detail</button>
   
    </div>
  </article>
};

export default UsersListItem;

