import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import 'cross-fetch/polyfill';
import 'dotenv/config';

const client = new ApolloClient({
  uri: process.env.GRAPHQL_SERVER_URL,
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GET_USERS {
        users {
          ...user
        }
      }

      fragment user on User {
        id
        firstName
        lastName
        createdAt
        userName
      }
    `,
  })
  .then((resp) => {
    const users = resp.data.users;

    for (const user of users) {
      console.log(`${user.firstName} ${user.lastName} | ${user.createdAt}`);
    }
  });
