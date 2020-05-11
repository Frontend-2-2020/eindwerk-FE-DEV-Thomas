import { API } from "../../helpers";

export const getUser = () => {
  return function (dispatch) {
    API.get("api/user").then((response) => {
      dispatch({
        type: "GET_USER",
        payload: response.data,
      });
    });
  };
};
