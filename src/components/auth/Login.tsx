import React, { useRef} from "react";
import { statusActions } from "../../store/statusSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import './Login.css';
const Login: React.FC = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(usernameInputRef.current!.value, passwordInputRef.current!.value)
        if (usernameInputRef.current!.value.trim().length === 0){
            dispatch(statusActions.setNotification({
              status: "error",
              title: "Form Error",
              message: "Please Enter Username "
            }))
            return;
          }
          if (passwordInputRef.current!.value.trim().length < 4){
            dispatch(statusActions.setNotification({
              status: "error",
              title: "Form Error",
              message: "Please Enter Password Greater Than Three Charachters "
            }))
            return;
          }
        dispatch(statusActions.setNotification({status: "", title: "", message: ""}))
        let user = {
            userName: usernameInputRef.current!.value,
            password: passwordInputRef.current!.value
          };
        fetch('http://localhost:3001/api/system/access-token', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
           
        }).then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch user data!");
              }
        
            return response.json();
        })
        .then(result => {
            console.log(result)
            dispatch(statusActions.setToken(result))
            dispatch(statusActions.setUsersChanged())
            dispatch(statusActions.setNotification({status: "success", title:"login", message:"you are successfully logged in"}))
            navigate("/");        
        }).catch(err => {
      dispatch(statusActions.setNotification({status:"error", title:"Fetch Error", message: "Error Occured, Check Yoor Credentials"}));
        })
    };

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    return <Card>
    <form onSubmit={submitHandler}>
        <div className="input">
        <label htmlFor="username">Username</label>
        <input type=""  id="username" ref={usernameInputRef}/>
        </div>
        <div className="input">
        <label htmlFor="username">Password</label>
        <input type="password"  id="password" ref={passwordInputRef}/>
         </div>
        <button type="submit" className="button">Login</button>
    </form>
    </Card>
};

export default Login;