import { gql } from '@apollo/client';
import { GQL_FRAGMENT_POST } from '../fragments/post';

export const GQL_POSTS_LIMIT = 2;

export const GQL_GET_POSTS = gql`
  query GET_POSTS(
    $sort: String = "indexRef",
    $order: ApiFiltersOrder = ASC,
    $start: Int = 0,
    $limit: Int = ${GQL_POSTS_LIMIT}
  ) {
    posts(inputFilter: { _sort: $sort, _order: $order, _start: $start, _limit: $limit }) {
      ...post
    }
  }

  ${GQL_FRAGMENT_POST}
`;
