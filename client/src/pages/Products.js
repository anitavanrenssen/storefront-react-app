import React, { Component } from "react";
import ProductDescription from "../components/Products/ProductDescription/ProductDescription";

class ProductPage extends Component {
  render() {
    return (
      <div>
        <h1>Products page</h1>
        <ProductDescription />
      </div>
    );
  }
}

export default ProductPage;
