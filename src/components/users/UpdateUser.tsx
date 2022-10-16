import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { userActions } from "../../store/userSlice";
import { statusActions } from "../../store/statusSlice";
import Card from "../UI/Card";

const UpdateUser: React.FC = () => {
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
        <button type="submit">Update</button>
      </form>
    </Card>
  );
};

export default UpdateUser;
