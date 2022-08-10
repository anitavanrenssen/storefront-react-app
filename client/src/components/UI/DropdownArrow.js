import React, { Component } from "react";

import classes from "./DropdownArrow.module.css";

class DropdownArrow extends Component {
  render() {
    return (
      <div className={classes.arrow}>
        <svg
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 0.5L4 3.5L7 0.5"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    );
  }
}

export default DropdownArrow;
