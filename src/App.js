import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/profile/:id" component={ProfilePage}></Route>
            <Route path="/:id" component={PostDetail}></Route>
            <Route path={["/", "/:page"]} exact component={Home}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
