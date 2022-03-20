import { gql } from '@apollo/client';

export const GQL_UPDATE_USER = gql`
  mutation UPDATE_USER($userId: ID!, $data: UpdateUserInput!) {
    updateUser(userId: $userId, data: $data) {
      id
    }
  }
`;
