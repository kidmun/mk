import { userActions } from "./user-slice";

export const fetchUserData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://user-project-c2bab-default-rtdb.firebaseio.com/users.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch user data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const userData = await fetchData();
      dispatch(
        userActions.replaceUsers({
          users: userData.users || [],
        })
      );
    } catch (error) {
      dispatch(
        userActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching  user data failed!",
        })
      );
    }
  };
};

export const sendUserData = (users) => {
  return async (dispatch) => {
    dispatch(
      userActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending user data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://user-project-c2bab-default-rtdb.firebaseio.com/users.json",
        {
          method: "PUT",
          body: JSON.stringify({
            users: users,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending user data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        userActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent user data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        userActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending user data failed!",
        })
      );
    }
  };
};
