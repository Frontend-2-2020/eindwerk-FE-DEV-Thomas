const defaultState = false;

function authReducer(state = defaultState, action) {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
}

export default authReducer;
