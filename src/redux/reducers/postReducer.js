const initialState = { posts: [], postDetail: {}, deleteStatus: "updated" };

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
        posts: store.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        postDetail: { ...store.postDetail, ...action.payload },
      };

    case "DELETE_POST":
      return {
        ...store,
        posts: store.posts.filter((post) => post.id !== action.payload.id),
      };
    case "ADD_COMMENT":
      return {
        ...store,

        postDetail: {
          ...store.postDetail,
          comments: [...store.postDetail.comments, action.payload],
        },
      };
    case "EDIT_COMMENT":
      return {
        ...store,
        postDetail: {
          ...store.postDetail,
          comments: store.postDetail.comments.map((comment) =>
            comment.id === action.payload.id ? action.payload : comment
          ),
        },
      };
    case "DELETE_COMMENT":
      return {
        // copy store as a whole
        ...store,

        postDetail: {
          // also copy postDetail as a whole first
          ...store.postDetail,

          // filter the array of the comments that do not resemble id of deleted comment
          comments: store.postDetail.comments.filter(
            (comment) => comment.id !== action.payload
          ),
        },
      };
    default:
      return store;
  }
}

export default postReducer;
