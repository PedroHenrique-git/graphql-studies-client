import { Navigate, useLocation } from 'react-router-dom';
import { useAuthVar } from '../graphql/reactive-vars/auth';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authData = useAuthVar();
  const location = useLocation();

  if (authData.isLoggedIn) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
