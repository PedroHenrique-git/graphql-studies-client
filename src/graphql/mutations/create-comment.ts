import { gql } from '@apollo/client';
import { GQL_FRAGMENT_COMMENT } from '../fragments/comment';

export const GQL_CREATE_COMMENT = gql`
  mutation CREATE_COMMENT($data: CreateCommentInput!) {
    createComment(data: $data) {
      ...comment
    }
  }

  ${GQL_FRAGMENT_COMMENT}
`;
