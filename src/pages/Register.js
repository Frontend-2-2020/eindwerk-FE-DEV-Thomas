import React, { Component } from "react";
import { Formik } from "formik";
import RegisterForm from "../components/forms/RegisterForm";
import { API } from "../helpers";

class Register extends Component {
  register = (values) => {
    API.post("users", values);
  };
  validate = (values) => {
    const errors = {};
    const requiredFields = ["first_name", "last_name", "email"];

    requiredFields.forEach((field) => {
      if (!values[field]) {
        errors[field] = "required";
      }
    });

    return errors;
  };

  render() {
    return (
      <div className="container mt-4">
        <Formik
          onSubmit={this.register}
          validate={this.validate}
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            favorite_color: "",
            avatar: "https://api.adorable.io/avatars/285/",
          }}
        >
          <RegisterForm />
        </Formik>
      </div>
    );
  }
}

export default Register;
