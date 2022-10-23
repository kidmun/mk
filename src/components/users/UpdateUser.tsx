import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { statusActions } from "../../store/statusSlice";
import Card from "../UI/Card";
import "./Project.css";
import { userActions } from "../../store/userSlice";
interface User {
  id: string;
  time: 0;
  transId: string;
  userName: string;
  fullName: string;
  email: string;
  phoneNo: string;
  roles: string[];
  enabled: true;
}


interface StateInterface {
  userName: string;
  fullName: string;
  email: string;
  phoneNo: string;
  
}


const UpdateUser: React.FC = () => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.status.token);
  const userData = useSelector((state: RootState) => state.status.currentUser)[0];
  console.log(userData)
  const userNameInputRef = useRef<any>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneNumebrInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
 
  // const [userData, setUserData] = useState<User>();
  
  const { userId } = useParams();
  
  const [state, setState] = useState<StateInterface>({
  
    userName: userData?.userName || '',
    fullName: userData?.fullName || '',
    email: userData?.email || '',
    phoneNo: userData?.phoneNo || '',
 

   
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'userName') {
      setState({ ...state, userName: event.target.value });
    } 
    else if (event.target.name === 'fullName') {
      setState({ ...state, fullName: event.target.value });
    }  else if (event.target.name === 'email') {
      setState({ ...state, email: event.target.value });
    } else if (event.target.name === 'phoneNo') {
      setState({ ...state, phoneNo: event.target.value });
    } 
   
    console.log(event.target.value);
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(userNameInputRef.current!.value)

    if (userNameInputRef.current!.value.trim().length === 0) {
      dispatch(
        statusActions.setNotification({
          status: "error",
          title: "Form Error",
          message: "please enter username",
        })
      );
      return;
    }
    if (fullNameInputRef.current!.value.trim().length === 0) {
      dispatch(
        statusActions.setNotification({
          status: "error",
          title: "Form Error",
          message: "Please Enter Full Name",
        })
      );
      return;
    }
    if (emailInputRef.current!.value.trim().length === 0) {
      dispatch(
        statusActions.setNotification({
          status: "error",
          title: "Form Error",
          message: "Please Enter Email",
        })
      );
      return;
    }
    if (phoneNumebrInputRef.current!.value.trim().length === 0) {
      dispatch(
        statusActions.setNotification({
          status: "error",
          title: "Form Error",
          message: "Please Enter Phone Number",
        })
      );
      return;
    }
    if (passwordInputRef.current!.value.trim().length < 4) {
      dispatch(
        statusActions.setNotification({
          status: "error",
          title: "Form Error",
          message: "Please Enter Password More Than Three Characters ",
        })
      );
      return;
    }
    dispatch(
      statusActions.setNotification({ status: "", title: "", message: "" })
    );

    fetch(
      "http://localhost:3001/api/system/user?system_id=c0662424-ad91-439d-a260-ec22e39a51a9&access_token=" +
        token,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInfo: {
            id: userId ,
            userName: userNameInputRef.current!.value,
            fullName: fullNameInputRef.current!.value,
            email: emailInputRef.current!.value,
            phoneNo: phoneNumebrInputRef.current!.value,
          },
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch user data!");
        }

        return response.json();
      })
      .then((result) => {
        console.log(result);
        dispatch(statusActions.setUsersChanged());
        dispatch(statusActions.defaultCurrentUser())
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className="input">
          <label htmlFor="userName">UserName</label>
          <input type="text" id="userName" name="userName" ref={userNameInputRef} onChange={handleChange} value={state.userName} />
        </div>
        <div className="input">
          <label htmlFor="fullName">FullName</label>
          <input type="text" id="fullName" name="fullName" ref={fullNameInputRef} onChange={handleChange} value={state.fullName}/>
        </div>

        <div className="input">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailInputRef} onChange={handleChange} value={state.email} />
        </div>
        <div className="input">
          <label htmlFor="phoneNo">Phone Number</label>
          <input type="text" name="phoneNo" id="phoneNo" ref={phoneNumebrInputRef} onChange={handleChange} value={state.phoneNo}/>
        </div>
        <div className="input">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" ref={passwordInputRef} />
        </div>
        <button type="submit" className="button">
          Update
        </button>
      </form>
    </Card>
  );
};

export default UpdateUser;
