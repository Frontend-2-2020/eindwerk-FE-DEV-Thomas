import React, { Component } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../redux/actions/postActions";
import { connect } from "react-redux";
import Post from "./Post";

class PostOverview extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <div className="container mt-4">
        <h2>Most recent posts</h2>
        <ul>
          {posts.map((post) => (
            <Post post={post} />
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
});

PostOverview.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostOverview);
