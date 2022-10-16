import React from 'react';
import { useSelector  } from 'react-redux';
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";
import './Users.css';


const Users = () => {
 
  const dispatch = useDispatch();
  const deleteHandler = (event) => {
 
dispatch(userActions.removeUser({userId: event.target.value}));
  };
  const editHandler = (event) => {
  
   dispatch(userActions.turnOnUpdating());
    dispatch(userActions.setUpdateId({updateId: event.target.value}))
 
  };
  const users = useSelector(state => state.users);
  console.log(users);
 

  return (
    <div className='centered'>
     
      <table>
  <thead>
    <tr>
      
      <th>First Name</th>
      <th>Last Name</th>
      <th>Age</th>
      <th>Gender</th>
      <th>Height</th>
      <th>Delete</th>
      <th>Edit</th>
     
      </tr>
  </thead>
  <tbody>
    {users.map(user => (<tr key={user.id}>
      
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.age}</td>
      <td>{user.gender}</td>
      <td>{user.height}</td>
      <td id="delete">
      <button onClick={deleteHandler} value={user.id}>Delete</button>
      </td>
     
      <td id="edit">
   
        <button onClick={editHandler} value={user.id} >Edit</button>
       
        </td>
      
      
      </tr>))}
    
    
   
  </tbody>
</table>
</div>
    
  );
};

export default Users;