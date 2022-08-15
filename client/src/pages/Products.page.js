import React, { Component } from "react";
import ProductDescription from "../components/Products/ProductDescription/ProductDescription";

class ProductPage extends Component {
  render() {
    return (
      <div>
        <ProductDescription id={this.props.match.params.id}/>
      </div>
    );
  }
}

export default ProductPage;
