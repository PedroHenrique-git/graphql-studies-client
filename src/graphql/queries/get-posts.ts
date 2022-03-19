import { gql } from '@apollo/client';

export const GQL_POSTS_LIMIT = 2;

export const GQL_GET_POSTS = gql`
  query GET_POSTS(
    $sort: String = "indexRef",
    $order: ApiFiltersOrder = DESC,
    $start: Int = 0,
    $limit: Int = ${GQL_POSTS_LIMIT}
  ) {
    posts(inputFilter: { _sort: $sort, _order: $order, _start: $start, _limit: $limit }) {
      id
      body
      title
      createdAt
      user {
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
  }
`;
