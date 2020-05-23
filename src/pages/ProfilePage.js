import React, { Component } from "react";
import { API } from "../helpers";
import moment from "moment";
import { connect } from "react-redux";
import Post from "../components/Post";
import Comment from "../components/Comment";

class ProfilePage extends Component {
  state = { user: {} };

  componentDidMount() {
    API.get("api/users/" + this.props.match.params.id).then((response) => {
      this.setState({
        user: response.data,
      });
      console.log(this.state);
    });
  }

  render() {
    const { user } = this.state;
    if (user.first_name) {
      return (
        <div className="container mt-4 pt-4" style={{ maxWidth: "900px" }}>
          {" "}
          <div>
            <h1>
              {
                (this.props.match.params.id = this.props.currentUser.id
                  ? "My Profile"
                  : "Profile")
              }
            </h1>
            <div className="d-flex mb-4">
              <img
                alt={
                  "This is the avatar of " +
                  user.first_name +
                  " " +
                  user.last_name
                }
                className="mr-4"
                style={{ maxHeight: "120px" }}
                src={
                  user.avatar.startsWith("http")
                    ? user.avatar
                    : "../assets/img/user.png"
                }
              />
              <div>
                <h3>
                  {user.first_name} {user.last_name}
                </h3>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    Email: <a href={"mailto:" + user.email}>{user.email}</a>
                  </li>
                  <li>
                    Last login: {moment(this.state.last_login_at).format("LL")}
                    {}
                  </li>
                  <li>
                    <a href="#blogPosts">View blog posts</a>
                  </li>
                  <li>
                    <a href="#comments">View comments</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 id="blogPosts">
              Blog posts (<span>{user.blog_posts.length}</span>)
            </h4>
            <ul style={{ listStyle: "none" }}>
              {user.blog_posts
                .sort(
                  ({ id: previousId }, { id: currentId }) =>
                    currentId - previousId
                )
                .map((post) => (
                  <li key={post.id}>
                    <Post post={post} user={user} key={post.id} />
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-4">
            <h4 id="comments">
              Comments (<span>{user.comments.length}</span>)
            </h4>
            <ul style={{ listStyle: "none" }}>
              {user.comments
                .sort(
                  ({ id: previousId }, { id: currentId }) =>
                    currentId - previousId
                )
                .map((comment) => (
                  <li key={comment.id} className="mt-4">
                    <h5 className="mb-0">
                      Answer to{" "}
                      <a href={"/" + comment.blog_post.id}>
                        {comment.blog_post.title}
                      </a>
                    </h5>
                    <Comment comment={comment} user={user} key={comment.id} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return <p className="mt-4 text-center">Loading...</p>;
    }
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth,
});

export default connect(mapStateToProps)(ProfilePage);
