import React, { Component } from "react";
import Button from "../../UI/Button";
import ProductAttributes from "./ProductAttributes";
import CartContext from "../../../store/cart-context";

import classes from "./ProductDetails.module.css";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      selectedAttributes: [],
    };
  }

  static contextType = CartContext;

  addToCartHandler(selectedAttributes) {
    this.setState({
      selectedAttributes: selectedAttributes.selectedAttributes,
    });
  }

  addItemHandler(product) {
    this.context.addItem({
      id: product.id + JSON.stringify(this.state.selectedAttributes),
      itemName: product.name,
      gallery: product.gallery,
      selectedAttributes: this.state.selectedAttributes,
      attributes: product.attributes,
      prices: product.prices,
      brand: product.brand,
      qty: 1,
    });
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <div>
          <h2 className={classes.brandheading}>{product.brand}</h2>
          <h3 className={classes.nameheading}>{product.name}</h3>
        </div>
        {product.attributes.length > 0 && (
          <ProductAttributes
            product={product}
            onAddToCart={this.addToCartHandler.bind(this)}
          />
        )}
        <div>
          <h4 className={classes.attrheading}>Price:</h4>
          <div className={classes.price}>
            <span>{product.prices[0].currency.symbol}</span>
            <span>{product.prices[0].amount}</span>
          </div>
        </div>
        <Button onClick={this.addItemHandler.bind(this, product)}>
          {!product.inStock ? "Out of stock" : "Add to cart"}
        </Button>
        <div className={classes.description}>{product.description}</div>
      </div>
    );
  }
}

export default ProductDetails;
