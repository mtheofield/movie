import { gql } from '@apollo/client';

const GET_STOCKS = gql`
  query getStocks {
    stocks {
      id
      name
      status
      
    }
  }
`;

const GET_STOCK = gql`
  query getStock($id: ID!) {
    stock(id: $id) {
      id
      name
      description
      status
      member {
        id
        name
        email
        phone
      }
    }
  }
`;

export { GET_STOCKS, GET_STOCK };
