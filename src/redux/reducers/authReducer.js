const initialState = { currentUser: {}, profileUser: {} };

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER":
      return {
        // Copy entire state
        ...state,

        // Replace only one section of state with payload from action
        currentUser: action.payload,
      };
    case "FORGET_USER":
      return {
        ...state,

        // Replace only one section of state with empty object
        currentUser: initialState.currentUser,
      };
    case "GET_PROFILEUSER":
      return {
        ...state,

        // Replace only one section of state with payload from action
        profileUser: action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;
