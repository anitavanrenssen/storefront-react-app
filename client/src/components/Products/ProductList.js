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

  // componentDidMount() {
  //   const { data } = PRODUCTS_QUERY;
  //   console.log(data);
  //   // this.setState({ productsArray: [1, 2, 3] });
  //   // console.log(this.state.productsArray);
  // }

  render() {
    return (
      <div>
        <h1 className={classes.title}>All</h1>
        <div className={classes.products}>
          <Query query={PRODUCTS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error! ${error.message}</p>;
              const { categories } = data;

              // const result = categories[0].products.filter((product) => {
              //   return product.category === "tech";
              // });
              return categories[0].products.map((product) => (
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
