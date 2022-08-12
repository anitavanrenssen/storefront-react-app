import React, { Component } from "react";
// import classes from "./ProductDescription.module.css";

import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import ProductGallery from "./ProductGallery";

const PRODUCT_QUERY = gql`
  {
    product(id: "huarache-x-stussy-le") {
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
  render() {
    return (
      <div>
        <Query query={PRODUCT_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error! ${error.message}</p>;
            const { product } = data;

            return (
              <div>
                <ProductGallery gallery={product.gallery} name={product.name} />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ProductDescription;
