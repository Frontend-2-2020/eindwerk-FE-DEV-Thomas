import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import NewCommentForm from "./forms/NewCommentForm";
import { editComment } from "../redux/actions/postActions";
import { deleteComment } from "../redux/actions/postActions";

class Comment extends Component {
  // State of component for hiding and showing form with CKEditor
  state = { editing: false };

  // Submitting comment by calling redux action
  submitEditingComment = (values) => {
    this.props.editComment(values, this.props.comment.id, this.props.user);
    this.setState({ editing: false });
  };

  // Validation of Formik form
  validate = (values) => {
    const errors = {};
    const requiredFields = ["body"];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = "required";
      }
    });

    return errors;
  };

  render() {
    const { comment } = this.props;
    const { user } = this.props;

    if (this.state.editing === true) {
      // Rendering Formik form if state says so
      return (
        <Formik
          onSubmit={this.submitEditingComment}
          validate={this.validate}
          initialValues={{
            body: comment.body,
          }}
        >
          {/* Passing on props to form */}
          {(props) => <NewCommentForm {...props} />}
        </Formik>
      );
    } else {
      // Option if comments is not being edited
      return (
        <li className="postLi comments">
          <div
            className="postLi-timestamp"
            // Conditional styling based on favorite color of logged in user
            style={
              user.id === this.props.currentUser.id
                ? {
                    backgroundColor: this.props.currentUser.favorite_color,
                  }
                : {}
            }
          >
            <p>{moment(comment.created_at).format("LL")}</p>
            {
              // Show or hide clickable icon to either edit or remove comment WHEN logged in user is writer
              this.props.currentUser.id === user.id &&
              window.location.pathname ===
                "/post/" + this.props.comment.blog_post_id ? (
                <div>
                  <img
                    className="clickable"
                    alt="Edit icon"
                    src="../assets/img/063-pencil.svg"
                    style={{
                      width: "30px",
                    }}
                    onClick={() => this.setState({ editing: true })}
                  ></img>
                  <img
                    className="clickable ml-2"
                    alt="Edit icon"
                    src="../assets/img/089-trash.svg"
                    style={{
                      width: "30px",
                    }}
                    // Call delete action from redux
                    onClick={() =>
                      this.props.deleteComment(this.props.comment.id)
                    }
                  ></img>
                </div>
              ) : (
                // Option when logged in user is not writer
                <div></div>
              )
            }
          </div>
          {/* Rendering content of comment from redux state */}
          <div className="postLi-content">
            <p dangerouslySetInnerHTML={{ __html: comment.body }}></p>
            <p style={{ textAlign: "right" }}>
              <span>says</span>{" "}
              <Link style={{ fontWeight: "bold" }} to={"/profile/" + user.id}>
                {user.first_name} {user.last_name}
              </Link>
              <img
                alt={
                  "This is the avatar of " +
                  user.first_name +
                  " " +
                  user.last_name
                }
                src={
                  // Catch error when url is wrong
                  user.avatar.startsWith("http")
                    ? user.avatar
                    : "../assets/img/user.png"
                }
                style={{ width: "30px" }}
                className="ml-2"
              ></img>
            </p>
          </div>
        </li>
      );
    }
  }
}

const mapStateToProps = (store) => {
  return {
    currentUser: store.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editComment: (values, id, user) => dispatch(editComment(values, id, user)),
    deleteComment: (id) => dispatch(deleteComment(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
