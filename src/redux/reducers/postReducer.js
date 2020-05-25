const initialState = { posts: [], postDetail: {} };

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
        ...store,
        posts: store.posts.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    default:
      return store;
  }
}

export default postReducer;
