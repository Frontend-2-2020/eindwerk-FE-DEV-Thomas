import React, { Component } from "react";
import { Formik } from "formik";
import RegisterForm from "../components/forms/RegisterForm";
import { API, TOKEN } from "../helpers";

class Register extends Component {
  register = (values) => {
    console.log(values);

    API.post("api/users", {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      favorite_color: values.favorite_color,
      avatar: values.avatar + values.email,
    }).then((response) => {
      alert(response.statusText);
    });
  };
  validate = (values) => {
    const errors = {};
    const requiredFields = ["first_name", "last_name", "email", "password"];

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
