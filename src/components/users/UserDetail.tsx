import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { RootState } from "../../store";
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



const UserDetail: React.FC = () => {
    const [user, setUser] = useState<User>();
    const token = useSelector((state: RootState) => state.status.token);
    const { userId } = useParams();
    console.log(userId)
    useEffect(() => {
        fetch("http://localhost:3001/api/system/user?access_token=" + token + "&user_id="+userId).then(response => {
            if (!response.ok) {
                throw new Error("Could not fetch user data!");
              }
        
            return response.json();
        })
        .then(result => {
            console.log(result.userInfo)
            setUser(result.userInfo)
                  
        }).catch(err => {
            console.log(err)
        })
    
    },[])
    
    return <div>
        <h2>{user?.fullName}</h2>
        <p>{}</p>
    </div>
};

export default UserDetail;