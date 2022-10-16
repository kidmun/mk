import React, { useRef } from "react";
import { statusActions } from "../../store/statusSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card";
import './CreateRole.css';
import { RootState } from "../../store";


const CreateRole: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.status.token)
  const roleNameInputRef = useRef<HTMLInputElement>(null);
 

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(roleNameInputRef.current!.value);
    if (roleNameInputRef.current!.value.trim().length === 0){
      dispatch(statusActions.setNotification({
        status: "error",
        title: "Form Error",
        message: "Please Enter Role Name "
      }))
      return;
    }
    dispatch(statusActions.setNotification({status: "", title: "", message: ""}))
    fetch(
      'http://localhost:3001/api/system/role?system_id=c0662424-ad91-439d-a260-ec22e39a51a9&access_token='+
        token,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: Math.random().toString(),
          roleName: "Role checker Name",
          Permissions: []
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch  response!");
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

  return (<Card>
    <form onSubmit={submitHandler}>
      <div className="input">
      <label htmlFor="roleName">Role Name</label>
      <input type="text" id="roleName" ref={roleNameInputRef} />
      </div>
      <button type="submit">Create</button>
    </form>
    </Card>
  );
};

export default CreateRole;