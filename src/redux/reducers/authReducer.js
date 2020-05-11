const initialState = {};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER":
      return action.payload;
    case "FORGET_USER":
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
