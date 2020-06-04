import React, { Component } from "react";
import { updatePage, getPosts } from "../redux/actions/postActions";

import { connect } from "react-redux";
import Post from "../components/Post";

// External libraries
import Pagination from "@material-ui/lab/Pagination";
import Loader from "../components/Loader";

class Home extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.currentPage);
  }

  // Handling pagination
  handlePageChange = (event, page) => {
    this.props.updatePage(page);
  };

  render() {
    const { posts } = this.props;

    if (this.props.canRedirect === true) {
      this.props.changeRedirectStatus();
      return <Loader />;
    } else {
      return (
        <div className="container mt-4" style={{ maxWidth: "900px" }}>
          <h3>Recent posts</h3>
          <div className="d-flex justify-content-center">
            {/* Pagination on top of page */}
            <Pagination
              page={this.props.currentPage}
              boundaryCount={1}
              count={10}
              onChange={this.handlePageChange}
              shape="rounded"
              size="large"
            />
          </div>
          <ul style={{ listStyle: "none" }}>
            {/* Mapping posts from redux state, with post component */}
            {posts.map((post) => (
              <li className="" key={post.id}>
                <Post post={post} postUser={post.user} key={post.id} />
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-center">
            {/* Pagination on bottom of page */}
            <Pagination
              page={this.props.currentPage}
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
}

// Get data from redux state
const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  currentPage: state.posts.currentPage,
  canRedirect: state.posts.canRedirect,
});

// Change data from redux state
const mapDispatchToProps = (dispatch) => ({
  getPosts: (page) => dispatch(getPosts(page)),
  updatePage: (newPage) => dispatch(updatePage(newPage)),
  changeRedirectStatus: () => dispatch({ type: "CHANGE_REDIRECT_STATUS" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
