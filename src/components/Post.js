import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Formik } from "formik";
import NewPostForm from "./forms/NewPostForm";
import { editPost } from "../redux/actions/postActions";

class Post extends Component {
  state = { editing: false };

  submitHandler = (values) => {
    const newValues = {
      body: values.body,
      title: values.title,
      user: this.props.currentUser,
    };
    this.props.editPost(this.props.post.id, newValues);
    this.setState({ editing: false });
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

    if (this.state.editing === true) {
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
    currentUser: store.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (postId, values) => dispatch(editPost(postId, values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
