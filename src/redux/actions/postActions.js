import { API } from "../../helpers";

export const getPosts = () => {
  return function (dispatch) {
    API.get("api/posts").then((response) => {
      dispatch({
        type: "ADD_POSTS",
        payload: response.data.data,
      });
    });
  };
};

export const getPostDetail = (postId) => {
  return function (dispatch) {
    API.get("api/posts/" + postId).then((response) => {
      dispatch({
        type: "LOAD_DETAIL",
        payload: response.data,
      });
    });
  };
};
