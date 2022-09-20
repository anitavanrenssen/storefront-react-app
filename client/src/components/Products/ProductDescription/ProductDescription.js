import React, { Component, Fragment } from "react";
import classes from "./ProductDescription.module.css";

import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import ProductGallery from "./ProductGallery";
import ProductDetails from "./ProductDetails";

import { CurrencyContext } from "../../../store/contexts";

const PRODUCT_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

class ProductDescription extends Component {
  static contextType = CurrencyContext;

  render() {
    const { currency } = this.context;

    return (
      <Fragment>
        <Query query={PRODUCT_QUERY} variables={{ id: this.props.id }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error! ${error.message}</p>;
            const { product } = data;

            return (
              <div className={classes["product-description"]}>
                <ProductGallery
                  gallery={product.gallery}
                  name={product.name}
                  inStock={product.inStock}
                />
                <ProductDetails product={product} currency={currency} />
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default ProductDescription;
