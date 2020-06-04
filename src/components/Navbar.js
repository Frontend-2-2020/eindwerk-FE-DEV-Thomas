import React, { Component } from "react";
import LoginBtn from "./buttons/LoginBtn";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="navbar-brand nav-link" href="/1">
              {/* Stupid basic icon as logo */}
              <img
                style={{ width: "40px" }}
                alt="logo"
                src="../assets/img/forum.png"
              />
              <span className="sr-only">(current)</span>
              <span className="ml-2">Front-End Forum</span>
            </a>
          </li>
        </ul>
        <div>
          {/* Custom login component rendering conditionally */}
          <LoginBtn />
        </div>
      </nav>
    );
  }
}

export default Navbar;
