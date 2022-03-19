import { gql } from '@apollo/client';

export const GQL_LOGOUT = gql`
  mutation LOGOUT($userName: String!) {
    logout(userName: $userName)
  }
`;
