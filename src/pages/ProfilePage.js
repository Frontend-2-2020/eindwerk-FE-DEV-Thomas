import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { HashLink as Link } from "react-router-hash-link";
import { getProfileUser } from "../redux/actions/authActions";

class ProfilePage extends Component {
  // state = { profileUser: {} };

  componentDidMount() {
    this.props.getProfileUser(this.props.match.params.id);

    // API.get("api/users/" + this.props.match.params.id).then((response) => {
    //   this.setState({
    //     profileUser: response.data,
    //   });
    //   console.log(this.state);
    //   console.log(this.props.currentUser);
    // });
  }

  componentDidUpdate() {
    if (this.props.match.params.id === this.props.currentUser.id) {
      this.props.getProfileUser(this.props.match.params.id);
    }
  }

  render() {
    const { profileUser } = this.props;
    if (this.props.match.params.id === this.props.currentUser.id) {
      this.props.getProfileUser(this.props.match.params.id);
    }

    if (profileUser.first_name) {
      return (
        <div className="container mt-4 pt-4" style={{ maxWidth: "900px" }}>
          {" "}
          <div>
            <h1>
              {profileUser.id === this.props.currentUser.id
                ? "My Profile"
                : "Profile"}
            </h1>
            <div className="d-flex mb-4">
              <img
                alt={
                  "This is the avatar of " +
                  profileUser.first_name +
                  " " +
                  profileUser.last_name
                }
                className="mr-4"
                style={{ maxHeight: "120px" }}
                src={
                  profileUser.avatar.startsWith("http")
                    ? profileUser.avatar
                    : "../assets/img/user.png"
                }
              />
              <div>
                <h3>
                  {profileUser.first_name} {profileUser.last_name}
                </h3>
                <ul style={{ listStyle: "none" }}>
                  <li>
                    Email:{" "}
                    <a href={"mailto:" + profileUser.email}>
                      {profileUser.email}
                    </a>
                  </li>
                  <li>
                    Last login: {moment(profileUser.last_login_at).format("LL")}
                    {}
                  </li>
                  <li>
                    <Link to="#blogPosts">View blog posts</Link>
                  </li>
                  <li>
                    <Link to="#comments">View comments</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 id="blogPosts">
              Blog posts (<span>{profileUser.blog_posts.length}</span>)
            </h4>
            <ul style={{ listStyle: "none" }}>
              {profileUser.blog_posts
                .sort(
                  ({ id: previousId }, { id: currentId }) =>
                    currentId - previousId
                )
                .map((post) => (
                  <li key={post.id}>
                    <Link
                      to={"/post/" + post.id}
                      style={{ textDecoration: "inherit", color: "inherit" }}
                    >
                      <Post post={post} user={profileUser} />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="mt-4">
            <h4 id="comments">
              Comments (<span>{profileUser.comments.length}</span>)
            </h4>
            <ul style={{ listStyle: "none" }}>
              {profileUser.comments
                .sort(
                  ({ id: previousId }, { id: currentId }) =>
                    currentId - previousId
                )
                .map((comment) => (
                  <li key={comment.id} className="mt-4">
                    <h5 className="mb-0">
                      Answer to{" "}
                      <Link to={"/post/" + comment.blog_post.id}>
                        {comment.blog_post.title}
                      </Link>
                    </h5>
                    <Comment
                      comment={comment}
                      user={profileUser}
                      key={comment.id}
                    />
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

const mapStateToProps = (store) => ({
  currentUser: store.auth.currentUser,
  profileUser: store.auth.profileUser,
});

const mapDispatchToProps = (dispatch) => ({
  getProfileUser: (id) => dispatch(getProfileUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
