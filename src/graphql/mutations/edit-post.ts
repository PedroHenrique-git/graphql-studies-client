import { gql } from '@apollo/client';

const GQL_EDIT_POST = gql`
  mutation EDIT_POST($updatePostId: ID!, $data: UpdatePostInput!) {
    updatePost(id: $updatePostId, data: $data) {
      id
    }
  }
`;

export default GQL_EDIT_POST;
