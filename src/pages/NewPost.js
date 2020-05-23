import React, { Component } from "react";
import EditForm from "../components/forms/EditForm";
import { Formik } from "formik";
import { connect } from "react-redux";
import { API } from "../helpers";

class NewPost extends Component {
  submitHandler = (values) => {
    console.log(values);
    console.log(this.props.user);
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
          {(props) => <EditForm {...props} />}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(NewPost);
