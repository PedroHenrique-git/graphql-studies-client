import { gql } from '@apollo/client';

export const GQL_GET_USER = gql`
  query GET_USER($userId: ID!) {
    user(id: $userId) {
      id
      firstName
      lastName
      userName
    }
  }
`;
