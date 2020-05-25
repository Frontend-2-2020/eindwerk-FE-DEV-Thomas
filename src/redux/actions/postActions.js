import { API } from "../../helpers";

export const getPosts = () => {
  return function (dispatch) {
    API.get("api/posts").then((response) => {
      dispatch({
        type: "GET_POSTS",
        payload: response.data.data,
      });
    });
  };
};

export const getDetailPost = (postId) => {
  return function (dispatch) {
    API.get("api/posts/" + postId).then((response) => {
      dispatch({
        type: "GET_DETAIL",
        payload: response.data,
      });
    });
  };
};

export const editPost = (postId, values) => {
  return function (dispatch) {
    API.put("api/posts/" + postId, values).then((response) => {
      dispatch({
        type: "EDIT_POST",
        payload: response.data,
      });
    });
  };
};
