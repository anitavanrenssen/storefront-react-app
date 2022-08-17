import React, { Component } from "react";
import classes from "./ProductDescription.module.css";
// import { graphql } from "graphql";
import { gql } from "graphql-tag";
import { Query } from "@apollo/client/react/components";
// import { withRouter } from "react-router-dom";
// import { useQuery } from "@apollo/client";
import ProductGallery from "./ProductGallery";
import ProductDetails from "./ProductDetails";

const PRODUCT_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
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

// function ProductDescription(props) {
//   const { loading, error, data } = useQuery(PRODUCT_QUERY, {
//     variables: {
//       id: props.match.params.id,
//     },
//   });

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error!</div>;

//   return (
//     <div className={classes.productdescription}>
//       <ProductGallery gallery={data.product.gallery} name={data.product.name} />
//       <ProductDetails
//         brand={data.product.brand}
//         name={data.product.name}
//         attributes={data.product.attributes}
//         prices={data.product.prices}
//         description={data.product.description}
//       />
//     </div>
//   );

// function Query(props) {
//   return props.children(useQuery(props.key, props.fn, props.options));
// }

class ProductDescription extends Component {
  // render() {
  //   return (
  //     <Query key="products" fn={() => wait(1000).then(() => "result")} options={}>
  //       {({ data, isLoading }) => {
  //         if (isLoading) return <h1>Loading</h1>;
  //         return (
  //           <div className="App">
  //             <h1>Hello {data}</h1>
  //             <h2>Start editing to see some magic happen!</h2>
  //           </div>
  //         );
  //       }}
  //     </Query>
  //   );
  // }

  // componentDidMount() {
  //   this.client
  //     .query({
  //       query: PRODUCT_QUERY,
  //       variables: {
  //         id: this.props.match.params.id,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // const { id } = this.props.match.params;
  //   // console.log(id);
  // }

  render() {
    return (
      <div>
        <Query
          query={PRODUCT_QUERY}
          variables={{ id: this.props.match.params.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error! ${error.message}</p>;
            const { product } = data;

            return (
              <div className={classes.productdescription}>
                <ProductGallery gallery={product.gallery} name={product.name} />
                <ProductDetails
                  brand={product.brand}
                  name={product.name}
                  attributes={product.attributes}
                  prices={product.prices}
                  description={product.description}
                />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ProductDescription;
