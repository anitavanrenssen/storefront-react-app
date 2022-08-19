import React, { Component } from "react";
import ProductList from "../components/Products/ProductList";

class CategoryPage extends Component {
  render() {
    // console.log(this.props.category);
    return <ProductList category={this.props.category} />;
  }
}

export default CategoryPage;
