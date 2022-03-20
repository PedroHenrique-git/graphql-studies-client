import { gql } from '@apollo/client';

const GQL_GET_POST = gql`
  query GET_POST($postId: ID!) {
    post(id: $postId) {
      ... on Post {
        id
        title
        body
        comments {
          comment
        }
        user {
          id
        }
      }
    }
  }
`;

export default GQL_GET_POST;
