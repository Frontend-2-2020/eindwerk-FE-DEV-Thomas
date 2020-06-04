import React, { Component } from "react";
import { Form, Field, ErrorMessage } from "formik";
import { SwatchesPicker } from "react-color";

class RegisterForm extends Component {
  // Default state of component for Swatchespicker
  state = {
    color: "#00000",
  };

  render() {
    const { setFieldValue, values } = this.props;

    return (
      <Form>
        <h2>Sign up</h2>
        <div className="row mt-4">
          <div className="col">
            <div className="form-group">
              <label htmlFor="first_name"> First name </label>
              <Field
                type="text"
                name="first_name"
                className="form-control"
                placeholder="Mark"
                id="first_name"
              />
              <ErrorMessage
                name="first_name"
                render={(error) => <div className="error">{error}</div>}
              />
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label htmlFor="last_name"> Last name </label>
              <Field
                type="text"
                name="last_name"
                className="form-control"
                placeholder="Markson"
                id="last_name"
              />
              <ErrorMessage name="last_name" />
            </div>
          </div>
        </div>
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
          <div className="col-2">
            <div className="form-group">
              <label htmlFor="favorite_color">Favorite color</label>

              <SwatchesPicker
                color={values.favorite_color}
                onChangeComplete={(color) =>
                  setFieldValue("favorite_color", color.hex)
                }
              />
              <ErrorMessage name="favorite_color" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <input
              type="submit"
              value="Register"
              className="btn btn-success float-right"
            />
          </div>
        </div>
      </Form>
    );
  }
}

export default RegisterForm;
