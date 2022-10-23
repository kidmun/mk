import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { statusActions } from "../../store/statusSlice";
const AssignRole: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.status.token);
  const roles = useSelector((state: RootState) => state.status.roles);


  console.log(roles);
  const { userId } = useParams();
 
  useEffect(() => {
    if (roles.length > 0) {
     
      fetch(
        "http://localhost:3001/api/system/assign-roles?system_id=c0662424-ad91-439d-a260-ec22e39a51a9&access_token=" +
          token +
          "&user_id=" +
          userId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(roles),
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.log(response)
            throw new Error("Could not fetch user data!");
          
          }

          return response.json();
        })
        .then((result) => {
          console.log(result);
          dispatch(statusActions.setUsersChanged());
          dispatch(statusActions.defaultRole())
          navigate('/');
       
        })
        .catch((err) => {
          dispatch(statusActions.defaultRole())
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      <h1>Assign</h1>
    </div>
  );
};

export default AssignRole;
