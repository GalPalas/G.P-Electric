import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getProductsQuery } from "queries/queries";

function ProductList(props) {
  const displayProducts = () => {
    const { loading, products } = props.data;
    return loading ? (
      <div>loading products...</div>
    ) : (
      products.map((product) => <li key={product.id}>{product.name}</li>)
    );
  };
  return (
    <div>
      <ul id="product-list">
        <li>Project Name</li>
        {displayProducts()}
      </ul>
    </div>
  );
}

export default graphql(getProductsQuery)(ProductList);
