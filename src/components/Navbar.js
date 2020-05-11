import React, { Component } from "react";
import LoginBtn from "./LoginBtn";

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
          <LoginBtn />
        </div>
      </nav>
    );
  }
}

export default Navbar;
