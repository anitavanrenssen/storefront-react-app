import React, { Component } from "react";
import ProductList from "../components/Products/ProductList";

class CategoryPage extends Component {
  render() {
    return <ProductList category={this.props.category} />;
  }
}

export default CategoryPage;
