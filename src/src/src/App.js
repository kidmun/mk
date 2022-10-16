import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import Users from "./components/Users";
import AddUser from "./components/AddUser";
import { sendUserData, fetchUserData } from "./store/user-actions";
import "./App.css";

let isInitial = true;

function App() {

  fetch('http://192.168.43.30:5000/api/system/users', {
    mode: 'cors'
  }).then(response => {
    return response
  }
  )
  .then(result => {
    console.log(result)
  })
  .catch(err => {
    console.log(err)
  });
  const [addMode, setAddMode] = useState("Add User");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const updating = useSelector((state) => state.updating);
  const changed = useSelector((state) => state.changed);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      setIsLoading(false);
      return;
    }

    if (changed) {
      dispatch(sendUserData(users));
    }
  }, [users, changed, dispatch]);

  const addModeHandler = () => {
    if (addMode === "Add User") {
      setAddMode("Cancel");
    } else {
      setAddMode("Add User");
    }
  };
  return (
    <div>
       {isLoading && <h1>Loading</h1>}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
     
      <div className="centered-app">
        {users.length !== 0 ? <Users /> : <h2>No users found</h2>}
        <button onClick={addModeHandler}>{addMode}</button>
      </div>
      {addMode === "Cancel" || updating ? <AddUser /> : ""}
    </div>
  );
}

export default App;
