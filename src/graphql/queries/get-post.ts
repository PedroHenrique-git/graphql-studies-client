import { gql } from '@apollo/client';

const GQL_GET_POST = gql`
  query GET_POST($postId: ID!) {
    post(id: $postId) {
      ... on Post {
        title
        body
      }
    }
  }
`;

export default GQL_GET_POST;
