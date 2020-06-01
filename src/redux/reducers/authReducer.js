const initialState = { currentUser: {}, profileUser: {} };

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "FORGET_USER":
      return {
        ...state,
        currentUser: initialState.currentUser,
      };
      return initialState;
    case "GET_PROFILEUSER":
      return {
        ...state,
        profileUser: action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;
