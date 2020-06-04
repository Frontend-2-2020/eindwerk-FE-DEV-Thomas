import React, { Component } from "react";
import LoginForm from "../components/forms/LoginForm";
import { Formik } from "formik";
import { API } from "../helpers";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/authActions";

class Login extends Component {
  // Login function
  login = (values) => {
    // Check values from Formik form in API
    API.post("oauth/token", {
      grant_type: "password",
      client_id: 2,
      client_secret: "iwrHFPcaiQ3bZTzHEwQpYkpiuHUlbIOJ9SAI6DLI",
      username: values.email,
      password: values.password,
    }).then((response) => {
      // If token received: save Token to localStorage
      window.localStorage.setItem(
        "LOGIN_OAUTHTOKEN",
        response.data.access_token
      );

      // Save token for future API requests.
      API.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access_token;

      // Get data of logged-in user from API
      this.props.getUser();

      // Redirect to home (with most recently visited page)
      if (this.props.currentUser) {
        this.props.history.push("/" + this.props.currentPage);
      }
    });
  };

  // Formik validation of email and password
  validate = (values) => {
    const errors = {};
    const requiredFields = ["email", "password"];

    // Set error messages
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
          onSubmit={this.login}
          validate={this.validate}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {/* Render login form component */}
          <LoginForm />
        </Formik>
      </div>
    );
  }
}

// Get data from redux state
const mapStateToProps = (store) => {
  return {
    currentUser: store.auth.currentUser,
    currentPage: store.posts.currentPage,
  };
};

// Use redux actions
const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
