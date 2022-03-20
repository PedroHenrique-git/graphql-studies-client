import { gql } from '@apollo/client';

const GQL_CREATE_USER = gql`
  mutation CREATE_USER($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;

export default GQL_CREATE_USER;
