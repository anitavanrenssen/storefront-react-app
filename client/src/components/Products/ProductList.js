import { Component } from "react";
import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";

// components
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

const PRODUCTS_QUERY = gql`
  {
    categories {
      name
      products {
        id
        inStock
        name
        gallery
        category
        prices {
          currency {
            symbol
          }
          amount
        }
      }
    }
  }
`;

class ProductList extends Component {
  render() {
    return (
      <div className={classes.products}>
        <Query query={PRODUCTS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>'Loading...'</p>;
            if (error) return <p>'Error! ${error.message}'</p>;
            const { categories } = data;
            return categories[0].products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default ProductList;