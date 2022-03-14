import { gql } from '@apollo/client';

export const GQL_LOGIN = gql`
  mutation LOGIN($data: LoginInput!) {
    login(data: $data) {
      token
      userId
    }
  }
`;
