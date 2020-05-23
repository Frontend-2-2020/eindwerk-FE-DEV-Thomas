import React, { Component } from "react";
import { ErrorMessage } from "formik";

class CustomErrorMessage extends Component {
  render() {
    return (
      <ErrorMessage
        name={this.props.name}
        render={(error) => <div className="error">{error}</div>}
      />
    );
  }
}

export default CustomErrorMessage;
