import React, { Component } from "react";
import { Form, Field, ErrorMessage } from "formik";
import { API } from "../../helpers";
import { SwatchesPicker } from "react-color";

class RegisterForm extends Component {
  componentDidMount() {
    API.get("users/44").then((response) => {
      console.log(response.data);
    });
  }

  state = {
    color: "#00000",
  };

  handleColorChange = (color) => {
    // Het kleur component werkt door de huidig geselecteerde kleur in de state op te slaan, dit is heel handig
    // om daar bij het versturen dan de waarde van uit te lezen.
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <Form>
        <h2>Give us your data</h2>
        <div className="row mt-4">
          <div className="col">
            <div className="form-group">
              <label htmlFor="first_name"> First name </label>
              <Field
                type="text"
                name="first_name"
                className="form-control"
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
                className="form-control"
                id="password"
                placeholder="name@example.com"
              />
              <ErrorMessage name="email" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="favorite_color">Favorite color</label>
              <SwatchesPicker
                color={this.state.color}
                onChangeComplete={this.handleColorChange}
              />
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
