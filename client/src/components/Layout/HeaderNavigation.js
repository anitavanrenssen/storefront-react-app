import React, { Component } from "react";
import { Link } from "react-router-dom";

import { CategoryContext } from "../../store/contexts";

import classes from "./HeaderNavigation.module.css";

class HeaderNavigation extends Component {
  static contextType = CategoryContext;

  constructor() {
    super();
    this.state = {
      activeLink: 0,
    };
  }

  componentDidMount() {
    this.context.changeCategory(this.props.categories[0].name);
  }

  changeCategoryHandler(e) {
    this.context.changeCategory(e.target.innerHTML);
    this.setState({ activeLink: +e.target.getAttribute("index") });
  }

  render() {
    const { categories } = this.props;

    return (
      <nav className={classes.nav}>
        <div className={classes["nav-buttons"]}>
          {categories.map((category, index) => {
            return (
              <Link
                to="/"
                key={index}
                index={index}
                className={`${classes["nav-button"]} ${
                  index === this.state.activeLink && classes.active
                }`}
                onClick={this.changeCategoryHandler.bind(this)}
              >
                {category.name}
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }
}

export default HeaderNavigation;
