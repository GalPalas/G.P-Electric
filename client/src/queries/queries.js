import { gql } from "apollo-boost";

const getProductsQuery = gql`
  {
    products {
      id
      name
    }
  }
`;

export { getProductsQuery };
