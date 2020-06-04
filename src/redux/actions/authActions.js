import { API } from "../../helpers";

// Action to get logged in user
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

// Action to get the user that is clicked on
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
