import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="navbar-brand nav-link" href="/">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
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
      </nav>
    );
  }
}

export default Navbar;
