import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "@apollo/client/react/components";
import classes from "./HeaderNavigation.module.css";

// import CategoryContext from "../../store/categories-context";

const CATEGORIES_QUERY = gql`
  {
    categories {
      name
    }
  }
`;

class HeaderNavigation extends Component {
  // static contextType = CategoryContext;

  // constructor() {
  //   super();
  //   this.state = {
  //     category: "",
  //   };
  // }

  changeCategoryHandler(e) {
    // this.setState((curState) => {
    //   return { category: e.target };
    // });
    // console.log(e.target.innerHTML);
    this.props.getCategory(e.target.innerHTML);
  }

  render() {
    return (
      <nav className={classes.nav}>
        <div className={classes.navlinks}>
          <Query query={CATEGORIES_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error! ${error.message}</p>;
              const { categories } = data;
              return categories.map((category, index) => {
                return (
                  <button
                    key={index}
                    onClick={this.changeCategoryHandler.bind(this)}
                  >
                    {category.name}
                  </button>
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
