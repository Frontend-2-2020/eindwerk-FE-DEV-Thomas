import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import Post from "../components/Post";
import Comment from "../components/Comment";
import { HashLink as Link } from "react-router-hash-link";
import { getProfileUser } from "../redux/actions/authActions";
import Loader from "../components/Loader";

class ProfilePage extends Component {
  componentDidMount() {
    // Get data of user on profile page
    this.props.getProfileUser(this.props.match.params.id);
  }

  render() {
    const { profileUser } = this.props;

    if (profileUser.first_name) {
      return (
        <div className="container mt-4 pt-4" style={{ maxWidth: "900px" }}>
          <div>
            <h1>
              {/* Change title based if the logged-in user is watching his own profile page*/}
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
                  // Catch error when there is a profile picture with a wrong url
                  profileUser.avatar.startsWith("http")
                    ? profileUser.avatar
                    : "../assets/img/user.png"
                }
              />
              <div>
                <h3>
                  {profileUser.first_name} {profileUser.last_name}
                </h3>
                {/* Details of user */}
                <ul style={{ listStyle: "none" }}>
                  <li>
                    Email:
                    <a href={"mailto:" + profileUser.email}>
                      {profileUser.email}
                    </a>
                  </li>
                  <li>
                    Last login: {moment(profileUser.last_login_at).format("LL")}
                    {}
                  </li>
                  {/* Jump to sections on the page */}
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

          {/* Blog posts section (could be pull out in a seperate component*/}
          <div className="mt-4">
            <h4 id="blogPosts">
              Blog posts (<span>{profileUser.blog_posts.length}</span>)
            </h4>
            <ul style={{ listStyle: "none" }}>
              {profileUser.blog_posts
                // Sorting with most recent on top

                .sort(
                  ({ id: previousId }, { id: currentId }) =>
                    currentId - previousId
                )
                .map((post) => (
                  <li key={post.id}>
                    <Post post={post} postUser={profileUser} />
                  </li>
                ))}
            </ul>
          </div>

          {/* Comments section (could be pull out in a seperate component*/}
          <div className="mt-4">
            <h4 id="comments">
              Comments (<span>{profileUser.comments.length}</span>)
            </h4>
            <ul style={{ listStyle: "none" }}>
              {profileUser.comments
                // Sorting with most recent on top
                .sort(
                  ({ id: previousId }, { id: currentId }) =>
                    currentId - previousId
                )
                .map((comment) => (
                  <div key={comment.id} className="mt-4">
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
                  </div>
                ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return <Loader />;
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
