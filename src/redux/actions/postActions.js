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
