import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store.js";

// Css inladen
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/index.css";
import "./css/loader.css";

import { Provider } from "react-redux";

ReactDOM.render(
  // Connectie met react redux
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
