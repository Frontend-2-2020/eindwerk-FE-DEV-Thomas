import React, { Component } from "react";
import { getPosts } from "../redux/actions/postActions";
import { getUser } from "../redux/actions/authActions";

import { connect } from "react-redux";
import Post from "../components/Post";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="container mt-4">
        <h2>Most recent posts</h2>
        <ul>
          {posts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts()),
  getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
