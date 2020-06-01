import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import NewCommentForm from "./forms/NewCommentForm";
import { editComment } from "../redux/actions/postActions";
import { deleteComment } from "../redux/actions/postActions";

class Comment extends Component {
  state = { editing: false };

  submitEditingComment = (values) => {
    console.log("received values from Formik");
    this.props.editComment(values, this.props.comment.id, this.props.user);
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
          onSubmit={this.submitEditingComment}
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
            {this.props.currentUser.id === user.id &&
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
                  onClick={() =>
                    this.props.deleteComment(this.props.comment.id)
                  }
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
