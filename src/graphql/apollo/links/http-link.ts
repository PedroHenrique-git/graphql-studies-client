import { HttpLink } from '@apollo/client';

const httpLink = new HttpLink({
  uri: String(import.meta.env.VITE_GRAPHQL_SERVER_URL),
  credentials: 'include',
});

export { httpLink };
