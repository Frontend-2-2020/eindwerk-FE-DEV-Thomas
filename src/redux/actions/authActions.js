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

export const getProfileUser = (id) => {
  return function (dispatch) {
    API.get("api/users/" + id).then((response) => {
      dispatch({
        type: "GET_PROFILEUSER",
        payload: response.data,
      });
    });
  };
};
