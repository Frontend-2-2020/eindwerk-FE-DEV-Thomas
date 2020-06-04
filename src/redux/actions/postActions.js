import { API } from "../../helpers";

// Action to fetch posts
export const getPosts = (currentPage) => {
  return function (dispatch) {
    API.get("api/posts?page=" + currentPage).then((response) => {
      dispatch({
        type: "GET_POSTS",
        payload: response.data,
      });
    });
  };
};

// Action to update the page via pagination
export const updatePage = (newPage) => {
  return function (dispatch) {
    API.get("api/posts?page=" + newPage).then((response) => {
      dispatch({
        type: "UPDATE_PAGE",
        payload: response.data,
      });
      window.scrollTo(0, 0);
    });
  };
};

// Action to fetch data from specific post that was clicked on
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

// Action to add a post to API
export const addPost = (values, user) => {
  return function (dispatch) {
    API.post("api/posts", {
      body: values.body,
      title: values.title,
      user: user,
    }).then((response) => {
      dispatch({
        type: "ADD_POST",
        payload: { ...response.data, user },
      });
    });
  };
};

// Action to edit a post message in API
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

// Action to delete a post from api
export const deletePost = (id) => {
  return function (dispatch) {
    API.delete("api/posts/" + id).then((response) => {
      dispatch({
        type: "DELETE_POST",
        payload: response.data,
      });
    });
  };
};

// Action to add a comment to post in api
export const addComment = (values, user) => {
  return function (dispatch) {
    API.post("api/comments", values).then((response) => {
      dispatch({
        type: "ADD_COMMENT",
        payload: { ...response.data, user },
      });
    });
  };
};

// Action to edit a comment in api
export const editComment = (values, id, user) => {
  return function (dispatch) {
    API.put("api/comments/" + id, values).then((response) => {
      dispatch({
        type: "EDIT_COMMENT",
        payload: { ...response.data, user },
      });
    });
  };
};

// Action to delete a comment from the api
export const deleteComment = (id) => {
  return function (dispatch) {
    API.delete("api/comments/" + id).then((response) => {
      dispatch({
        type: "DELETE_COMMENT",
        payload: id,
      });
    });
  };
};
