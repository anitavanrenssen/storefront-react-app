import React, { Component } from "react";
import ProductList from "../components/Products/ProductList";

class CategoryPage extends Component {
  render() {
    return <ProductList client={this.props.client} />;
  }
}

export default CategoryPage;
