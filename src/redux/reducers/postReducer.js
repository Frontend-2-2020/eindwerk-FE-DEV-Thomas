const initialState = [];

function postReducer(store = initialState, action) {
  switch (action.type) {
    case "ADD_POSTS":
      return action.payload;
    case "LOAD_DETAIL":
      return action.payload;
    default:
      return store;
  }
}

export default postReducer;
