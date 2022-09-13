import React, { Component } from "react";
import Button from "../../UI/Button";
import ProductAttributes from "./ProductAttributes";
import { CartContext } from "../../../store/contexts";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

import classes from "./ProductDetails.module.css";

class ProductDetails extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     selectedAttributes: [],
  //   };
  // }

  static contextType = CartContext;

  addToCartHandler(selectedAttributes) {
    // this.setState((curState) => {
    //   return { selectedAttributes: selectedAttributes.selectedAttributes };
    // });
    let attr = selectedAttributes.selectedAttributes;
    localStorage.setItem("attr-key", JSON.stringify(attr));
  }

  addItemHandler(product) {
    let attr = JSON.parse(localStorage.getItem("attr-key"));

    this.context.addItem({
      id: product.id + JSON.stringify(attr),
      itemName: product.name,
      gallery: product.gallery,
      selectedAttributes: attr,
      attributes: product.attributes,
      prices: product.prices,
      brand: product.brand,
      qty: 1,
    });
  }

  render() {
    const { product } = this.props;

    const htmlString = product.description;
    const htmlFrom = (htmlString) => {
      const cleanHtmlString = DOMPurify.sanitize(htmlString, {
        USE_PROFILES: { html: true },
      });
      const html = parse(cleanHtmlString);
      return html;
    };

    const filteredCurrency = product.prices.filter((currency) => {
      return currency.currency.label === this.props.currency;
    });

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
            inStock={product.inStock}
          />
        )}
        <div>
          <h4 className={classes.attrheading}>Price:</h4>
          <div className={classes.price}>
            {filteredCurrency[0].currency.symbol}
            {filteredCurrency[0].amount}
          </div>
        </div>
        <Button
          inStock={product.inStock}
          onClick={this.addItemHandler.bind(this, product)}
        >
          {!product.inStock ? "Out of stock" : "Add to cart"}
        </Button>
        <div className={classes.description}>
          {htmlString && htmlFrom(htmlString)}
        </div>
      </div>
    );
  }
}

export default ProductDetails;
