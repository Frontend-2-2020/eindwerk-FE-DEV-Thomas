import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import NewCommentForm from "./forms/NewCommentForm";

class Comment extends Component {
  state = { editing: false };

  submitHandler = (values) => {
    const newValues = {
      body: values.body,
      user: this.props.currentUser,
    };
    //this.props.editPost(this.props.post.id, newValues);
    this.setState({ editing: false });
  };

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
      return (
        <Formik
          onSubmit={this.submitHandler}
          validate={this.validate}
          initialValues={{
            body: comment.body,
          }}
        >
          {(props) => <NewCommentForm {...props} />}
        </Formik>
      );
    } else {
      return (
        <li className="postLi comments">
          <div
            className="postLi-timestamp"
            style={
              user.id === this.props.currentUser.id
                ? {
                    backgroundColor: this.props.currentUser.favorite_color,
                  }
                : {}
            }
          >
            <p>{moment(comment.created_at).format("LL")}</p>
            {this.props.currentUser.id === user.id ? (
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
              </div>
            ) : (
              <div></div>
            )}
          </div>
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
    currentUser: store.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // editComment: (postId, values) => dispatch(editPost(postId, values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
