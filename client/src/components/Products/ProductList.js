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
        name
        gallery
      }
    }
  }
`;

class ProductList extends Component {
  constructor() {
    super();

    this.getAllDuelists = () => {
      this.props.client
        .query({
          query: gql`
            {
              categories {
                name
                products {
                  name
                  gallery
                }
              }
            }
          `,
        })
        .then((result) => {
          console.log(result);
        });
    };
  }

  render() {
    return (
      <div className={classes.products}>
        <Query query={PRODUCTS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <p>'Loading...'</p>;
            if (error) return <p>'Error! ${error.message}'</p>;
            const { categories } = data;
            return categories[0].products.map((product) => (
              <ProductItem product={product} />
            ));
          }}
        </Query>
        {/* <button onClick={this.getAllDuelists}>data</button> */}
      </div>
    );
  }
}

export default ProductList;
