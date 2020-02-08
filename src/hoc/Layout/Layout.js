import React, { Component } from "react";

class Layout extends Component {
  render() {
    return (
      <div>
        <main>{this.props.name}</main>
      </div>
    );
  }
}

export default Layout;
