import { Navigate, useLocation } from 'react-router-dom';
import { useAuthVar } from '../../graphql/reactive-vars/auth';
import LoginForm from '../LoginForm/LoginForm';
import Wrapper from '../Wrapper/Wrapper';

const Login = () => {
  const authData = useAuthVar();
  const location = useLocation();

  if (authData.isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <Wrapper hasHeader={true} hasFooter={false}>
      <LoginForm />
    </Wrapper>
  );
};

export default Login;
