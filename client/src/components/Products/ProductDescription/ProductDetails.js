import React, { Component } from "react";

import ProductAttributes from "./ProductAttributes";
import Button from "../../UI/Button";

import { CartContext } from "../../../store/contexts";

import parse from "html-react-parser";
import DOMPurify from "dompurify";

import classes from "./ProductDetails.module.css";

class ProductDetails extends Component {
  static contextType = CartContext;

  addToCartHandler(selectedAttributes) {
    let attributeSelection = selectedAttributes.selectedAttributes;
    localStorage.setItem("attr-key", JSON.stringify(attributeSelection));
  }

  addItemHandler(product) {
    let attributeSelection = JSON.parse(localStorage.getItem("attr-key"));

    // if product to be added has attributes and attributes have been selected, add product to cart
    if (
      product.attributes.length > 0 &&
      attributeSelection &&
      Object.keys(attributeSelection).length > 0
    ) {
      this.context.addItem({
        id: product.id + JSON.stringify(attributeSelection),
        itemName: product.name,
        gallery: product.gallery,
        selectedAttributes: attributeSelection,
        attributes: product.attributes,
        prices: product.prices,
        brand: product.brand,
        qty: 1,
      });
      // if product to be added does not have attributes, add product to cart without attribute selection
    } else if (product.attributes.length === 0) {
      this.context.addItem({
        id: product.id + "[]",
        itemName: product.name,
        gallery: product.gallery,
        prices: product.prices,
        brand: product.brand,
        qty: 1,
      });
    }
  }

  render() {
    const { product } = this.props;

    //HTML format parsed, sanitized and presented as HTML without using dangerouslySetInnerHTML
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
      <div className={classes["product-details"]}>
        <section>
          <h2 className={classes["brand-heading"]}>{product.brand}</h2>
          <h3 className={classes["name-heading"]}>{product.name}</h3>
        </section>
        {product.attributes.length > 0 && (
          <ProductAttributes
            product={product}
            onAddToCart={this.addToCartHandler.bind(this)}
            inStock={product.inStock}
          />
        )}
        <section>
          <h4 className={classes["price-heading"]}>Price:</h4>
          <div className={classes.price}>
            {filteredCurrency[0].currency.symbol}
            {filteredCurrency[0].amount}
          </div>
        </section>
        <Button
          inStock={product.inStock}
          onClick={this.addItemHandler.bind(this, product)}
        >
          {!product.inStock ? "Out of stock" : "Add to cart"}
        </Button>
        <section className={classes.description}>
          {htmlString && htmlFrom(htmlString)}
        </section>
      </div>
    );
  }
}

export default ProductDetails;
