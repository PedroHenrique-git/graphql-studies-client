import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: String(import.meta.env.VITE_GRAPHQL_SERVER_URL),
  cache: new InMemoryCache(),
});

export { client };
