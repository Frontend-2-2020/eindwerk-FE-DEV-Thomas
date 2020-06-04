import React, { Component } from "react";
import { Formik } from "formik";
import RegisterForm from "../components/forms/RegisterForm";
import { API } from "../helpers";

class Register extends Component {
  register = (values) => {
    // API call not necessary via redux action, only usefull on this page
    API.post("api/users", {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      favorite_color: values.favorite_color,
      avatar: values.avatar + values.email,
    })
      .then((response) => {
        // Redirect to loginpage
        this.props.history.push("/login");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // Formik validation
  validate = (values) => {
    const errors = {};
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "password",
      "favorite_color",
    ];

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
            password: "",
            favorite_color: "",
          }}
        >
          {/* Pass props to form */}
          {(props) => <RegisterForm {...props} />}
        </Formik>
      </div>
    );
  }
}

export default Register;
