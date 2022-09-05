import { Component } from "react";
import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";

import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";
import { CurrencyContext } from "../../store/contexts";
import { CartContext } from "../../store/contexts";

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
  }
`;

class ProductList extends Component {
  // static contextType = CurrencyContext;

  render() {
    let categoryFilter = this.props.category;

    // const { currency } = this.context;

    return (
      <div>
        <h1 className={classes.title}>{categoryFilter}</h1>
        <div className={classes.products}>
          <CartContext.Consumer>
            {(cart) => (
              <CurrencyContext.Consumer>
                {(currency) => (
                  <Query query={PRODUCTS_QUERY}>
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error! ${error.message}</p>;
                      const { categories } = data;

                      const filteredCategory = categories.filter((category) => {
                        return category.name === categoryFilter;
                      });
                      return filteredCategory[0].products.map((product) => (
                        <ProductItem
                          key={product.id}
                          product={product}
                          cart={cart}
                          currency={currency}
                        />
                      ));
                    }}
                  </Query>
                )}
              </CurrencyContext.Consumer>
            )}
          </CartContext.Consumer>
        </div>
      </div>
    );
  }
}

export default ProductList;
