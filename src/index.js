import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";

import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
