import React, { Component } from "react";
import { getPosts } from "../redux/actions/postActions";
import { getUser } from "../redux/actions/authActions";

import { connect } from "react-redux";
import Post from "../components/Post";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

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
                to={"/post/" + post.id}
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Post post={post} user={post.user} key={post.id} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-center">
          <Pagination
            page={posts.current_page}
            boundaryCount={1}
            count={10}
            onChange={console.log("paginatie veranderd")}
            shape="rounded"
            size="large"
          />
        </div>
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
