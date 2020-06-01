import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import NewPostForm from "./forms/NewPostForm";
import { editPost } from "../redux/actions/postActions";
import { deletePost } from "../redux/actions/postActions";

class Post extends Component {
  state = { editingPost: false };

  submitHandler = (values) => {
    const newValues = {
      body: values.body,
      title: values.title,
      user: this.props.currentUser,
    };
    this.props.editPost(this.props.post.id, newValues);
    this.setState({ editingPost: false });
  };

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
    const { user } = this.props;

    if (this.state.editingPost === true) {
      return (
        <Formik
          onSubmit={this.submitHandler}
          validate={this.validate}
          initialValues={{
            title: post.title,
            body: post.body,
          }}
        >
          {(props) => <NewPostForm {...props} />}
        </Formik>
      );
    } else {
      return (
        <div className="postLi">
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
            <p>{moment(post.created_at).format("LL")}</p>
            {this.props.currentUser.id === user.id &&
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
                  onClick={() =>
                    this.props.deletePost(post.id, this.props.history)
                  }
                ></img>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="postLi-content">
            <h4>{post.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: post.body }}></p>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (postId, values) => dispatch(editPost(postId, values)),
    deletePost: (id, history) => dispatch(deletePost(id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
