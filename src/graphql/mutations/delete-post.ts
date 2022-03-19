import { gql } from '@apollo/client';

const GQL_DELETE_POST = gql`
  mutation DELETE_POST($deletePostId: ID!) {
    deletePost(id: $deletePostId)
  }
`;

export default GQL_DELETE_POST;
