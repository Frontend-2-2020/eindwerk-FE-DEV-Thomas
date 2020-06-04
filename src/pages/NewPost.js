import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import NewPostForm from "../components/forms/NewPostForm";
import { addPost, getPosts, updatePage } from "../redux/actions/postActions";

class NewPost extends Component {
  // Handling Formik submit of New Post form
  submitHandler = (values) => {
    this.props.addPost(values, this.props.currentUser);
  };

  // Validation of Formik form
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
    // Handle redirect
    if (this.props.canRedirect === true) {
      this.props.history.push("/1");
    }

    return (
      <div className="container mt-4" style={{ maxWidth: "900px" }}>
        {" "}
        <h3>New Post</h3>
        <Formik
          onSubmit={this.submitHandler}
          validate={this.validate}
          initialValues={{
            title: "",
            body: "",
          }}
        >
          {/* Pass props to formik form */}
          {(props) => <NewPostForm {...props} />}
        </Formik>
      </div>
    );
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
    getPosts: (page) => dispatch(getPosts(page)),
    addPost: (values, user) => dispatch(addPost(values, user)),
    updatePage: (newPage) => dispatch(updatePage(newPage)),
    changeRedirectStatus: () => dispatch({ type: "CHANGE_REDIRECT_STATUS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
