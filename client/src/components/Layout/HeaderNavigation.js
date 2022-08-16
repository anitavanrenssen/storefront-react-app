import React, { Component } from "react";
import classes from "./HeaderNavigation.module.css";

class HeaderNavigation extends Component {
  constructor() {
    super();
    this.state = {
      categoryDisplay: "",
    };
  }
  render() {
    return (
      <nav className={classes.nav}>
        <div className={classes.navlinks}>
          <button>All</button>
          <button>Clothes</button>
          <button>Tech</button>
        </div>
      </nav>
    );
  }
}

export default HeaderNavigation;
