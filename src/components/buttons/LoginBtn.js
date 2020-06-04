import React, { Component } from "react";
import { connect } from "react-redux";
import { API } from "../../helpers";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/actions/authActions";
import { getProfileUser } from "../../redux/actions/authActions";

class LoginBtn extends Component {
  logout = () => {
    // Remove token from localstorage
    window.localStorage.setItem("LOGIN_OAUTHTOKEN", undefined);

    // Remove token from API calls
    API.defaults.headers.common["Authorization"] = undefined;

    // Remove user from state
    this.props.forgetUser();
  };

  render() {
    const { currentUser } = this.props;

    if (currentUser.first_name) {
      // Render when logged in
      return (
        <div>
          {/* Saying hi to the user */}
          <span className="mr-2 text-success">
            Hi, <span>{currentUser.first_name}</span>
          </span>
          <Link
            to={"/profile/" + currentUser.id}
            onClick={() => this.props.getProfileUser(currentUser.id)}
          >
            <img
              alt={
                "This is the avatar of " +
                currentUser.first_name +
                " " +
                currentUser.last_name
              }
              src={
                // Catch error with wrong url
                currentUser.avatar.startsWith("http")
                  ? currentUser.avatar
                  : "../assets/img/user.png"
              }
              style={{ width: "30px" }}
              className="mr-2"
            ></img>
          </Link>

          {/* Show logout button */}
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            // Call logout function when clicked
            onClick={this.logout}
          >
            Logout
          </button>

          {/* Custom button for new post  */}
          <div className="newPostDiv">
            <Link to="/newpost">
              <img
                alt="New post icon"
                src="../assets/img/067-plus.svg"
                style={{ width: "30px" }}
                className="mr-2 ml-2"
              ></img>
            </Link>
          </div>
        </div>
      );
    } else {
      // Option when no user is found (thus no user is logged in)
      return (
        <div>
          {/* Login button to go to login page */}
          <Link
            className="btn btn-outline-success my-2 my-sm-0 ml-2"
            to="/login"
          >
            Login
          </Link>

          {/* Register button to go to register page */}
          <Link
            className="btn btn-outline-success my-2 my-sm-0 ml-2"
            to="/register"
          >
            Register
          </Link>
        </div>
      );
    }
  }
}

const mapStateToProps = (store) => {
  return {
    currentUser: store.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileUser: (currentUser) => dispatch(getProfileUser(currentUser)),
    getUser: () => dispatch(getUser()),
    forgetUser: () => dispatch({ type: "FORGET_USER" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginBtn);
