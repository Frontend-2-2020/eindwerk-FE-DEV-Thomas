import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import authReducer from "./reducers/authReducer.js";
import postReducer from "./reducers/postReducer.js";
import thunk from "redux-thunk";

const store = createStore(
  combineReducers({ auth: authReducer, posts: postReducer }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  )
);

export default store;
