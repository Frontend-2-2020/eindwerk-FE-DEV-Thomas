import React, { Component } from "react";
import { getPosts } from "../redux/actions/postActions";
import { updatePage } from "../redux/actions/postActions";
import { getUser } from "../redux/actions/authActions";

import { connect } from "react-redux";
import Post from "../components/Post";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Loader from "../components/Loader";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getPosts(this.props.currentPage);
  }

  handlePageChange = (event, page) => {
    this.props.updatePage(page);
  };

  render() {
    const { posts } = this.props;

    return (
      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        <h3>Recent posts</h3>
        <div className="d-flex justify-content-center">
          <Pagination
            page={posts.current_page}
            boundaryCount={1}
            count={10}
            onChange={this.handlePageChange}
            shape="rounded"
            size="large"
          />
        </div>
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
            onChange={this.handlePageChange}
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
  currentPage: state.currentPage,
});

const mapDispatchToProps = (dispatch) => ({
  getPosts: () => dispatch(getPosts()),
  getUser: () => dispatch(getUser()),
  updatePage: (newPage) => dispatch(updatePage(newPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
