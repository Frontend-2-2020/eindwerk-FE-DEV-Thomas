import axios from "axios";

export const getPosts = () => {
  return function (dispatch) {
    axios.get("https://eindwerk.jnnck.be/api/posts").then((response) => {
      dispatch({
        type: "ADD_POSTS",
        payload: response.data.data,
      });
    });
  };
};

export const getPostDetail = (postId) => {
  return function (dispatch) {
    axios
      .get("https://eindwerk.jnnck.be/api/posts/" + postId)
      .then((response) => {
        dispatch({
          type: "LOAD_DETAIL",
          payload: response.data,
        });
      });
  };
};
