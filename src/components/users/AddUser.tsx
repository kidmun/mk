import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { userActions } from "../../store/userSlice";
import { statusActions } from "../../store/statusSlice";
import Card from "../UI/Card";

const AddUser: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.status.token);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneNumebrInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(userNameInputRef.current!.value);
    console.log(fullNameInputRef.current!.value);
    console.log(emailInputRef.current!.value);
    console.log(phoneNumebrInputRef.current!.value);
    console.log(passwordInputRef.current!.value);
    if (userNameInputRef.current!.value.trim().length === 0){
      dispatch(statusActions.setNotification({
        status: "error",
        title: "Form Error",
        message: "please enter username"
      }))
      return;
    }
    if (fullNameInputRef.current!.value.trim().length === 0){
      dispatch(statusActions.setNotification({
        status: "error",
        title: "Form Error",
        message: "Please Enter Full Name"
      }))
      return;
    }
    if (emailInputRef.current!.value.trim().length === 0){
      dispatch(statusActions.setNotification({
        status: "error",
        title: "Form Error",
        message: "Please Enter Email"
      }))
      return;
    }
    if (phoneNumebrInputRef.current!.value.trim().length === 0){
      dispatch(statusActions.setNotification({
        status: "error",
        title: "Form Error",
        message: "Please Enter Phone Number"
      }))
      return;
    }
    if (passwordInputRef.current!.value.trim().length < 4){
      dispatch(statusActions.setNotification({
        status: "error",
        title: "Form Error",
        message: "Please Enter Password More Than Three Characters "
      }))
      return;
    }
    dispatch(statusActions.setNotification({status: "", title: "", message: ""}))
    const userData = {
      userInfo: {
        id: "56489571-8f9d-4507-9589-75aa94e80839",
        userName: userNameInputRef.current!.value,
        fullName: fullNameInputRef.current!.value,
        email: emailInputRef.current!.value,
        phoneNo: phoneNumebrInputRef.current!.value,
      },
      password: passwordInputRef.current!.value,
    };
    fetch(
      'http://localhost:3001/api/system/user?system_id=c0662424-ad91-439d-a260-ec22e39a51a9&access_token='+
        token,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
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
          <input type="text" id="userName" ref={userNameInputRef} />
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
        <button type="submit">Submit</button>
      </form>
    </Card>
  );
};

export default AddUser;
