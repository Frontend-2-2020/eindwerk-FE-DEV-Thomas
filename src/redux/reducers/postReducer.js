const initialState = {
  posts: [],
  postDetail: {},
  canRedirect: null,
  currentPage: 1,
};

function postReducer(store = initialState, action) {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...store,

        // Replace only one section of state with payload from action
        posts: action.payload.data,
      };

    case "UPDATE_PAGE":
      return {
        ...store,

        // Replace two sections of state with payload from action
        currentPage: action.payload.current_page,
        posts: action.payload.data,
      };
    case "GET_DETAIL":
      return {
        ...store,
        postDetail: action.payload,
      };
    case "ADD_POST":
      return {
        ...store,
        posts: [...store.posts, action.payload],
        currentPage: 1,
        canRedirect: true,
      };
    case "EDIT_POST":
      return {
        ...store,

        // Replace one section of state by a new array after being mapped and the one changed post has been replaced in the original array
        posts: store.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
        postDetail: { ...store.postDetail, ...action.payload },
      };

    case "DELETE_POST":
      return {
        ...store,

        // Replace section of state by a new array after a particular post has been filtered out
        posts: store.posts.filter((post) => post.id !== action.payload.id),
        canRedirect: true,
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
    case "CHANGE_REDIRECT_STATUS":
      return {
        ...store,
        canRedirect: store.canRedirect === true ? false : true,
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
