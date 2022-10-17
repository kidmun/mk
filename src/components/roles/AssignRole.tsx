import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
const AssignRole: React.FC = () => {
    const token = useSelector((state: RootState) => state.status.token)
    const roles = useSelector((state: RootState) => state.status.roles)
    const { userId} = useParams();
    console.log(userId);
    useEffect(() => {
        fetch(
            'http://localhost:3001/api/system/assign-roles?system_id=c0662424-ad91-439d-a260-ec22e39a51a9&access_token='+
              token+ "&user_id="+userId,
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
    }, [])
    return <div>
        <h1>Assign</h1>
    </div>
};

export default AssignRole;