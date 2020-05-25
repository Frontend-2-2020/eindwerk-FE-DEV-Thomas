import React, { Component } from "react";
import { getPosts } from "../redux/actions/postActions";
import { getUser } from "../redux/actions/authActions";

import { connect } from "react-redux";
import Post from "../components/Post";
import { Link } from "react-router-dom";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        <h3>Recent posts</h3>
        <ul style={{ listStyle: "none" }}>
          {posts.map((post) => (
            <li className="" key={post.id}>
              <Link
                to={"/" + post.id}
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Post post={post} user={post.user} key={post.id} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts()),
  getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
