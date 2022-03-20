import { useMutation } from '@apollo/client';
import { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { GQL_LOGIN } from '../../graphql/mutations/auth';
import { authDataManager } from '../../graphql/reactive-vars/auth';
import { loginFormVar } from '../../graphql/reactive-vars/login-form';
import LoadingComponent from '../Loading/Loading';
import SimpleMessage from '../SimpleMessage/SimpleMessage';
import './styles.css';

const LoginForm = () => {
  const { userName, password } = loginFormVar.useLoginForm();
  const loginFormValues = loginFormVar.get();
  const navigate = useNavigate();

  const [login, { loading, error }] = useMutation(GQL_LOGIN, {
    onCompleted(data: { login: { userId: string } }) {
      authDataManager.setVar(userName, data.login.userId, true);
      navigate({ pathname: '/' });
    },
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName || !password) {
      toast('you need to send a username and password!', {
        className: 'message',
      });
      return;
    }

    await login({
      variables: {
        data: {
          userName,
          password,
        },
      },
    });
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <p>Username: </p>
          <input
            type="text"
            name="username"
            id="username"
            value={userName}
            onChange={(e) => {
              loginFormVar.set({
                ...loginFormValues,
                userName: e.target.value,
              });
            }}
            autoComplete="off"
          />
        </div>
        <div className="input-group">
          <p>Password: </p>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) =>
              loginFormVar.set({
                ...loginFormValues,
                password: e.target.value,
              })
            }
            autoComplete="off"
          />
        </div>
        <div className="login-sighup">
          <button>Login</button>
          <div className="create-account">
            <Link to="/signup">create account</Link>
          </div>
        </div>
      </form>
      {error ? <SimpleMessage message={error.message} type="error" /> : <></>}
    </>
  );
};

export default LoginForm;
