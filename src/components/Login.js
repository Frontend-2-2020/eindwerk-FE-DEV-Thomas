import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    const { isLoggedIn, logout, login } = this.props;

    if (this.props.isLoggedIn) {
      return (
        <div>
          <span className="mr-4 text-success">
            Hi, <span>NAME</span>
          </span>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={login}
          >
            Login
          </button>
        </div>
      );
    }
  }
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch({ type: "LOGIN" }),
    logout: () => dispatch({ type: "LOGOUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
