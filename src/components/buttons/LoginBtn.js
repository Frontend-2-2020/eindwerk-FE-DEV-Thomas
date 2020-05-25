import React, { Component } from "react";
import { connect } from "react-redux";
import { API, TOKEN } from "../../helpers";
import { Link } from "react-router-dom";
import { getUser } from "../../redux/actions/authActions";

class LoginBtn extends Component {
  logout = () => {
    // Ook bij logout doen we eigenlijk 3 dingen, namelijk het omgekeerde van de login.

    // We verwijderen de token uit localstorage, zodanig dat een user niet opnieuw is ingelogd na een page refresh
    window.localStorage.setItem("LOGIN_OAUTHTOKEN", undefined);

    // We verwijderen de token uit onze API calls voor de huidige sessie.
    API.defaults.headers.common["Authorization"] = undefined;

    // We verwijderen de user uit de state
    this.props.forgetUser();
  };

  render() {
    const { user } = this.props;

    if (TOKEN && !user.first_name) {
      this.props.getUser();
    }

    if (user.first_name) {
      return (
        <div>
          <span className="mr-2 text-success">
            Hi, <span>{user.first_name}</span>
          </span>
          <Link to={"/profile/" + user.id}>
            <img
              alt={
                "This is the avatar of " +
                user.first_name +
                " " +
                user.last_name
              }
              src={
                user.avatar.startsWith("http")
                  ? user.avatar
                  : "../assets/img/user.png"
              }
              style={{ width: "30px" }}
              className="mr-2"
            ></img>
          </Link>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={this.logout}
          >
            Logout
          </button>

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
      return (
        <div>
          <Link
            className="btn btn-outline-success my-2 my-sm-0 ml-2"
            to="/login"
          >
            Login
          </Link>
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
    user: store.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
    forgetUser: () => dispatch({ type: "FORGET_USER" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginBtn);
