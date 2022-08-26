import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";
import { Link } from "react-router-dom";
import classes from "./HeaderNavigation.module.css";

const CATEGORIES_QUERY = gql`
  {
    categories {
      name
    }
  }
`;

class HeaderNavigation extends Component {
  constructor() {
    super();
    this.state = {
      activeLink: 0,
    };
  }

  changeCategoryHandler(e) {
    this.props.getCategory(e.target.innerHTML);
    this.setState({ activeLink: +e.target.getAttribute("index") });
  }

  render() {
    return (
      <nav className={classes.nav}>
        <div className={classes.navbtns}>
          <Query query={CATEGORIES_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error! ${error.message}</p>;
              const { categories } = data;
              return categories.map((category, index) => {
                return (
                  <Link
                    to="/"
                    key={index}
                    index={index}
                    className={`${classes.navbtn} ${
                      index === this.state.activeLink && classes.active
                    }`}
                    onClick={this.changeCategoryHandler.bind(this)}
                  >
                    {category.name}
                  </Link>
                );
              });
            }}
          </Query>
        </div>
      </nav>
    );
  }
}

export default HeaderNavigation;
