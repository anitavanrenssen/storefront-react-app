import React, { Component } from "react";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import classes from "./DropdownArrow.module.css";

class DropdownArrow extends Component {
  render() {
    const isDropdownActive = this.props.onDropdown;

    return (
      <div className={isDropdownActive ? classes.arrowrotate : ""}>
        <Arrow />
      </div>
    );
  }
}

export default DropdownArrow;
