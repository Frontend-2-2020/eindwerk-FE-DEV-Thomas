import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import NewPostForm from "./forms/NewPostForm";
import { editPost } from "../redux/actions/postActions";
import { deletePost } from "../redux/actions/postActions";

class Post extends Component {
  // State for toggling editor
  state = { editingPost: false };

  // Passing along Formik form values
  submitHandler = (values) => {
    const newValues = {
      body: values.body,
      title: values.title,
      user: this.props.currentUser,
    };
    // Call of redux action to post edited message to api
    this.props.editPost(this.props.post.id, newValues);

    // Toggle editing back
    this.setState({ editingPost: false });
  };

  // Validation of Formik post form
  validate = (values) => {
    const errors = {};
    const requiredFields = ["title", "body"];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = "required";
      }
    });

    return errors;
  };

  render() {
    const { post } = this.props;
    const { postUser } = this.props;

    if (this.state.editingPost === true) {
      // Showing formik form with CKEditor when the state demands the people to edit!
      return (
        <Formik
          onSubmit={this.submitHandler}
          validate={this.validate}
          initialValues={{
            title: post.title,
            body: post.body,
          }}
        >
          {/* Passing on props to post form */}
          {(props) => <NewPostForm {...props} />}
        </Formik>
      );
    } else {
      // Option to show if the state tells the people they may rest in peace and can lay down their editing work for now...
      return (
        <div className="postLi">
          <div
            className="postLi-timestamp"
            // Styling conditioner... uh... I mean, conditional styling when user is the same as writer of the post.
            style={
              this.props.currentUser !== undefined &&
              postUser.id === this.props.currentUser.id
                ? {
                    backgroundColor: this.props.currentUser.favorite_color,
                  }
                : {}
            }
          >
            <p>{moment(post.created_at).format("LL")}</p>
            {/* Show custom button to remove or edit post when the user is the same as the writer AND only on the PostDetail page */}
            {this.props.currentUser !== undefined &&
            this.props.currentUser.id === postUser.id &&
            window.location.pathname === "/post/" + post.id ? (
              <div>
                <img
                  className="clickable"
                  alt="Edit icon"
                  src="../assets/img/063-pencil.svg"
                  style={{
                    width: "30px",
                  }}
                  onClick={() => this.setState({ editingPost: true })}
                ></img>
                <img
                  className="clickable ml-2"
                  alt="Edit icon"
                  src="../assets/img/089-trash.svg"
                  style={{
                    width: "30px",
                  }}
                  onClick={() => this.props.deletePost(post.id)}
                ></img>
              </div>
            ) : (
              <div></div>
            )}
          </div>

          {/* Actual content of the post */}
          <div className="postLi-content">
            <Link
              to={"/post/" + post.id}
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              <h4>{post.title}</h4>
              {/* New coding heroes are born when one takes risks and fears no danger when rendering tags from api in html */}
              <p dangerouslySetInnerHTML={{ __html: post.body }}></p>
            </Link>
            <p style={{ textAlign: "right" }}>
              <span>says</span>{" "}
              <Link
                style={{ fontWeight: "bold" }}
                to={"/profile/" + postUser.id}
              >
                {postUser.first_name} {postUser.last_name}
              </Link>
              <img
                alt={
                  "This is the avatar of " +
                  postUser.first_name +
                  " " +
                  postUser.last_name
                }
                src={
                  // Catching error when url is wrong
                  postUser.avatar.startsWith("http")
                    ? postUser.avatar
                    : "../assets/img/user.png"
                }
                style={{ width: "30px" }}
                className="ml-2"
              ></img>
            </p>

            {post.comments_count !== undefined ? (
              <p className="postLi-comments">
                <span>{post.comments_count} </span>
                {post.comments_count === 1 ? "comment" : "comments"}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (store) => {
  return {
    currentUser: store.auth.currentUser,
    currentPage: store.posts.currentPage,
    canRedirect: store.posts.canRedirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (postId, values) => dispatch(editPost(postId, values)),
    deletePost: (id, history) => dispatch(deletePost(id, history)),
    changeRedirectStatus: () => dispatch({ type: "CHANGE_REDIRECT_STATUS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
