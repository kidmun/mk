import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { RootState } from "../../store";
import Card from '../UI/Card';
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
    const roles = useSelector((state: RootState) => state.roles.roles);
    let userRoles = [];
  
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
    if (user?.roles){
        for (const roleId of user!.roles){
            const allRoles = [...roles]
           let role: any = roles.find(item => item.id === roleId);
           if (role){     
            console.log(role)   
            userRoles.push(role.roleName);
           }
    
        }
        
    }
  
    return <Card>
        <h2>Full Name: {user?.fullName}</h2>
        <h3>Email: {user?.email}</h3>
        <h3>UserName: {user?.userName}</h3>
        <h3>PhoneNo: {user?.phoneNo}</h3>

        {userRoles.length > 0 ? <h2>Roles</h2>: <h2>No roles</h2>}
        {userRoles.length > 0 && userRoles.map(item => (<h2>{item}</h2>))}
        
    </Card>
};

export default UserDetail;