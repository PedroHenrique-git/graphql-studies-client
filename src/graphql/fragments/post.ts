import { gql } from '@apollo/client';

export const GQL_FRAGMENT_POST = gql`
  fragment post on Post {
    id
    body
    title
    createdAt
    numberOfComments @client
    user {
      id
      firstName
      lastName
    }
    comments {
      comment
      user {
        firstName
        lastName
      }
    }
  }
`;
