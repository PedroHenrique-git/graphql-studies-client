import { ApolloClient, InMemoryCache } from '@apollo/client';
import { httpLink } from './links/http-link';

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export { client };
