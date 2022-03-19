import { ApolloClient } from '@apollo/client';
import { cache } from './cache/in-memory-cache';
import { httpLink } from './links/http-link';

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export { client };
