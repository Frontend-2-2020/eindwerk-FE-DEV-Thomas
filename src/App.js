import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewPost from "./pages/NewPost";
import Navbar from "./components/Navbar";
import { getUser } from "./redux/actions/authActions";
import { getPosts } from "./redux/actions/postActions";

import { connect } from "react-redux";
import { TOKEN } from "./helpers";

class App extends Component {
  componentDidMount() {
    // Wanneer de app ingeladen is worden ook meest recente posts geladen zodat die in ieder geval op elke pagina aanwezig zijn.
    if (!this.props.posts[0]) {
      this.props.getPosts(1);
    }
  }

  render() {
    // Wanneer app laadt worden de user data van ingelogde user opgehaald indien er een token is
    if (TOKEN && !this.props.currentUser.id) {
      this.props.getUser();
    }

    return (
      <div>
        <Router>
          <Navbar />

          {/* Router switch om de verschillende pagina's te renderen */}
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/newpost" component={NewPost}></Route>
            <Route path="/profile/:id" component={ProfilePage}></Route>
            <Route path="/post/:id" component={PostDetail}></Route>
            <Route path={["/", "/:page"]} exact component={Home}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  posts: state.posts.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  getPosts: (page) => dispatch(getPosts(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
