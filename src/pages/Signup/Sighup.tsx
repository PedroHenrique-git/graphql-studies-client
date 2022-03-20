import { Navigate, useLocation } from 'react-router-dom';
import UserForm from '../../components/UserForm/UserForm';
import Wrapper from '../../components/Wrapper/Wrapper';
import { useAuthVar } from '../../graphql/reactive-vars/auth';

const Sighup = () => {
  const authData = useAuthVar();
  const location = useLocation();

  if (authData.isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <Wrapper hasHeader hasFooter={false}>
      <UserForm />
    </Wrapper>
  );
};

export default Sighup;
