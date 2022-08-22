import { Component } from "react";
import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";

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
  constructor() {
    super();
    this.state = {
      productsArray: [],
    };
  }

  render() {
    let categoryFilter = this.props.category;

    return (
      <div>
        <h1 className={classes.title}>{categoryFilter}</h1>
        <div className={classes.products}>
          <Query query={PRODUCTS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error! ${error.message}</p>;
              const { categories } = data;

              const filteredCategory = categories.filter((category) => {
                return category.name === categoryFilter;
              });
              return filteredCategory[0].products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ));
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default ProductList;
