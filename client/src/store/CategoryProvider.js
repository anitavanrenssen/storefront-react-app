import React, { Component } from "react";
import { CategoryContext } from "./contexts";

class CategoryProvider extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
    };
  }

  changeCategoryHandler(id) {
    this.setState({ category: id });
  }

  render() {
    const categoryContext = {
      selectedCategory: this.state.category,
      changeCategory: this.changeCategoryHandler.bind(this),
    };

    return (
      <CategoryContext.Provider value={categoryContext}>
        {this.props.children}
      </CategoryContext.Provider>
    );
  }
}

export default CategoryProvider;
