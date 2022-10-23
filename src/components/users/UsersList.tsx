import React from "react";
import UsersListItem from "./UsersListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

const UsersList: React.FC = () => {
  const users = useSelector((state: RootState) => state.users.users);

  return (
    <ul>
      {users.map((item) => (
        <UsersListItem key={item.id} user={item} />
      ))}
    </ul>
  );
};

export default UsersList;
