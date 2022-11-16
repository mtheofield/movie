import { gql } from '@apollo/client';
//addng a single stock 

const ADD_STOCK = gql`
  mutation AddStock(
    $name: String!
    $description: String!
    $status: StockStatus!
    $memberId: ID!
  ) {
    addStock(
      name: $name
      description: $description
      status: $status
      memberId: $memberId
    ) {
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


//deleting the stock
const DELETE_STOCK = gql`
  mutation DeleteStock($id: ID!) {
    deleteStock(id: $id) {
      id
    }
  }
`;

//updating to do with stock 
const UPDATE_STOCK = gql`
  mutation UpdateStock(
    $id: ID!
    $name: String!
    $description: String!
    $status: StockStatusUpdate!
  ) {
    updateStock(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
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

export { ADD_STOCK, DELETE_STOCK, UPDATE_STOCK };
