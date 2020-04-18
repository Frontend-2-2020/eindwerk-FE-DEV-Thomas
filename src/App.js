import React, { Component } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <Switch>
            <Route path="/:id" component={PostDetail}></Route>
            <Route path={["/", "/:page"]} exact component={Home}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
