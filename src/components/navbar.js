import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-light bg-light">
          <span class="navbar-text">
            Total Counters {this.props.totalCounters}
          </span>
        </nav>
      </div>
    );
  }
}
