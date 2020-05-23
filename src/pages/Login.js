import React, { Component } from "react";
import LoginForm from "../components/forms/LoginForm";
import { Formik } from "formik";
import { API } from "../helpers";
import { connect } from "react-redux";
import { getUser } from "../redux/actions/authActions";

class Login extends Component {
  login = (values) => {
    API.post("oauth/token", {
      grant_type: "password",
      client_id: 2,
      client_secret: "iwrHFPcaiQ3bZTzHEwQpYkpiuHUlbIOJ9SAI6DLI",
      username: values.email,
      password: values.password,
    }).then((response) => {
      // Als die call lukt doen we 3 dingen:

      // met deze token. In API.js stellen we deze token onmiddellijk in bij het inladen van de pagina als deze beschikbaar is Token opslaan in localStorage
      window.localStorage.setItem(
        "LOGIN_OAUTHTOKEN",
        response.data.access_token
      );

      // Om vanaf nu onze API requests te voorzien van een token moeten we dit als volgt instellen.
      // Volgende refresh is dit niet meer nodig want dan doen we exact dit in de API.js
      API.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.access_token;

      // Na het juist instellen van alles kunnen we gaan ophalen wie er is ingelogd om dit dan weer te geven op de pagina
      this.props.getUser();

      if (this.props.user) {
        this.props.history.push("/");
      }
    });
  };

  validate = (values) => {
    const errors = {};
    const requiredFields = ["email", "password"];

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
          <LoginForm />
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    user: store.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
