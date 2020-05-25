const initialState = { posts: [], postDetail: {}, newComment: {} };

function postReducer(store = initialState, action) {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...store,
        posts: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...store,
        postDetail: action.payload,
      };
    case "EDIT_POST":
      return {
        posts: store.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        postDetail: { ...store.postDetail, ...action.payload },
      };
    case "ADD_COMMENT":
      return {
        ...store,
        postDetail: {
          ...store.postDetail.comments,
          ...action.payload,
        },
      };
    default:
      return store;
  }
}

export default postReducer;
