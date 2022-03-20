import { gql } from '@apollo/client';

const GQL_CREATE_POST = gql`
  mutation CREATE_POST($data: CreatePostInput!) {
    createPost(data: $data) {
      id
    }
  }
`;

export default GQL_CREATE_POST;
