import React, { Component } from "react";
import { Form, Field, ErrorMessage } from "formik";

class LoginForm extends Component {
  render() {
    return (
      <Form>
        <h2>Login</h2>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="email"> Email address </label>
              <Field
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
              />
              <ErrorMessage name="email" />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="password"> Password </label>
              <Field
                type="password"
                name="password"
                required
                autoComplete="current-password"
                placeholder="Password"
                className="form-control"
                id="password"
              />
              <ErrorMessage name="email" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="submit"
              value="Login"
              className="btn btn-success float-right"
            />
          </div>
        </div>
      </Form>
    );
  }
}

export default LoginForm;
