import React, { useRef, useEffect } from "react";


import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { userActions } from "../../store/userSlice";
import { statusActions } from "../../store/statusSlice";
import Card from "../UI/Card";
import './Project.css'

const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.status.token);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneNumebrInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  
  const { userId } = useParams();
  console.log(userId)
  

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(userNameInputRef.current!.value);
    console.log(fullNameInputRef.current!.value);
    console.log(emailInputRef.current!.value);
    console.log(phoneNumebrInputRef.current!.value);
    console.log(passwordInputRef.current!.value);

      fetch("http://localhost:3001/api/system/user?system_id=c0662424-ad91-439d-a260-ec22e39a51a9&access_token="+token, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userInfo: {
            id: userId,
            userName: userNameInputRef.current!.value,
            fullName: fullNameInputRef.current!.value,
            email: emailInputRef.current!.value,
            phoneNo: phoneNumebrInputRef.current!.value
          }
        }
        ) 
  
      }).then(response => {
          if (!response.ok) {
              throw new Error("Could not fetch user data!");
            }
      
          return response.json();
      })
      .then(result => {
          console.log(result)
          dispatch(statusActions.setUsersChanged())
          navigate('/');
      }).catch(err => {
          console.log(err)
      })
  

  };
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className="input">
          <label htmlFor="userName">UserName</label>
          <input type="text" id="userName"  ref={userNameInputRef} />
        </div>
        <div className="input">
          <label htmlFor="fullName">FullName</label>
          <input type="text" id="fullName" ref={fullNameInputRef} />
        </div>
        <div className="input">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className="input">
          <label htmlFor="phoneNo">Phone Number</label>
          <input type="text" id="phoneNo" ref={phoneNumebrInputRef} />
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        <button type="submit" className="button">Update</button>
      </form>
    </Card>
  );
};

export default UpdateUser;
