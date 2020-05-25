import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPost from "./pages/NewPost";
import Navbar from "./components/Navbar";
import { connect } from "react-redux";
import { getUser } from "./redux/actions/authActions";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />

          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/newpost" component={NewPost}></Route>
            <Route path="/profile/:id" component={ProfilePage}></Route>
            <Route path="/:id" component={PostDetail}></Route>
            <Route path={["/", "/:page"]} exact component={Home}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  user: store.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => getUser(),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
