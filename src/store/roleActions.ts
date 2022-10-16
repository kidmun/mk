import { userActions } from "./userSlice";
import { statusActions } from "./statusSlice";
import { Dispatch } from 'redux'
import { roleActions } from "./roleSlice";
export const fetchRoles:any = (token: string) => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3001/api/system/roles?access_token=" + token
      );

      if (!response.ok) {
        throw new Error("Could not fetch role data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const roleData = await fetchData();
      if (!roleData){
        dispatch(roleActions.replaceRoles([]));
      }
      dispatch(roleActions.replaceRoles(roleData));
    } catch (error) {
      dispatch(
        statusActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Fetching  roles data failed!",
        })
      );
    }
  };
};