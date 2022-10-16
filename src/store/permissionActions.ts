import { permissionAction } from "./permissionSlice";
import { statusActions } from "./statusSlice";

export const fetchPermissions:any = (token: string) => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3001/api/system/permissions?access_token=" + token
      );

      if (!response.ok) {
        throw new Error("Could not fetch permission data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const permissionData = await fetchData();
      if (!permissionData){
        dispatch(permissionAction.replacePermission([]));
      }
      dispatch(permissionAction.replacePermission(permissionData));
    } catch (error) {
      dispatch(
        statusActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Fetching  user data failed!",
        })
      );
    }
  };
};