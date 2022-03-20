import { gql } from '@apollo/client';
import { GQL_FRAGMENT_POST } from '../fragments/post';

const GQL_GET_POST = gql`
  query GET_POST($postId: ID!) {
    post(id: $postId) {
      ... on Post {
        ...post
      }
    }
  }

  ${GQL_FRAGMENT_POST}
`;

export default GQL_GET_POST;
