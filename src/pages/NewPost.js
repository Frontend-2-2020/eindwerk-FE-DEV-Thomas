import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { API } from "../helpers";
import NewPostForm from "../components/forms/NewPostForm";

class NewPost extends Component {
  submitHandler = (values) => {
    console.log(values);
    console.log(this.props.currentUser);
    API.post("api/posts", {
      body: values.body,
      title: values.title,
      user: this.currentUser,
    }).then((response) => {
      this.props.history.push("/");
    });
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
    console.log(this.props.user);
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
          {(props) => <NewPostForm {...props} />}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    currentUser: store.auth.currentUser,
  };
};

export default connect(mapStateToProps)(NewPost);
