import React, { Component } from "react";

import classes from "./Button.module.css";

class Button extends Component {
  render() {
    return (
      <button
        className={classes.button}
        type={this.props.type || "button"}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
