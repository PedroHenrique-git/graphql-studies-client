import { Navigate, useLocation } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import Wrapper from '../../components/Wrapper/Wrapper';
import { useAuthVar } from '../../graphql/reactive-vars/auth';

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
