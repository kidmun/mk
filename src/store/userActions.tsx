import { userActions } from "./userSlice";
import { statusActions } from "./statusSlice";
import { Dispatch } from 'redux'
export const fetchUsers:any = (token: string) => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3001/api/system/users?access_token=" + token
      );

      if (!response.ok) {
        throw new Error("Could not fetch users!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const userData = await fetchData();
      if (!userData){
        dispatch(userActions.replaceUsers([]));
      }
      dispatch(userActions.replaceUsers(userData));
    } catch (error) {
      dispatch(
        statusActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Fetching  users failed!",
        })
      );
    }
  };
};
