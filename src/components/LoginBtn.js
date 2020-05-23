import React, { Component } from "react";
import { connect } from "react-redux";
import { API, TOKEN } from "../helpers";

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
    console.log(TOKEN);
    console.log(user);
    if (user.first_name) {
      return (
        <div>
          <a href={"/profile/" + user.id}>
            <span className="mr-2 text-success">
              Hi, <span>{user.first_name}</span>
            </span>
            <img
              alt={
                "This is the avatar of " +
                user.first_name +
                " " +
                user.last_name
              }
              src={user.avatar}
              style={{ width: "30px" }}
              className="mr-2"
            ></img>
          </a>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={this.logout}
          >
            Logout
          </button>

          <div className="newPostDiv">
            <a href="/newpost">
              <img
                alt="New post icon"
                src="../assets/img/067-plus.svg"
                style={{ width: "30px" }}
                className="mr-2 ml-2"
              ></img>
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <a
            className="btn btn-outline-success my-2 my-sm-0 ml-2"
            href="/login"
          >
            Login
          </a>
          <a
            className="btn btn-outline-success my-2 my-sm-0 ml-2"
            href="/register"
          >
            Register
          </a>
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
    getUser: () => dispatch({ type: "GET_USER" }),
    forgetUser: () => dispatch({ type: "FORGET_USER" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginBtn);
