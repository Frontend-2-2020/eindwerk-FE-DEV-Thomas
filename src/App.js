import React, { Component } from "react";
import Navbar from "./components/Navbar";
import PostOverview from "./components/PostOverview";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <PostOverview />
      </div>
    );
  }
}

export default App;
