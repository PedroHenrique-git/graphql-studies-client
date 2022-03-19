import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { GQL_LOGOUT } from '../../graphql/mutations/logout';
import { authDataManager, useAuthVar } from '../../graphql/reactive-vars/auth';
import LoadingComponent from '../Loading/Loading';

const Logout = () => {
  const authData = useAuthVar();
  const [logout, { loading, error }] = useMutation(GQL_LOGOUT);

  const handleLogout = async () => {
    await logout({
      variables: {
        userName: authDataManager.getVar().userName,
      },
    });

    authDataManager.resetVar();
  };

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    toast(error.message || 'There was an error', {
      className: 'message',
    });
  }

  return (
    <>
      {authData.isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <></>
      )}
    </>
  );
};

export default Logout;
