/* eslint-disable no-useless-catch */
import { client } from '../graphql/apollo/client';
import { GQL_LOGOUT } from '../graphql/mutations/logout';
import { authDataManager } from '../graphql/reactive-vars/auth';

export default async function logoutFn() {
  try {
    await client.mutate({
      mutation: GQL_LOGOUT,
      variables: {
        userName: authDataManager.getVar().userName,
      },
    });
    authDataManager.resetVar();
  } catch (err) {
    throw err;
  }
}
