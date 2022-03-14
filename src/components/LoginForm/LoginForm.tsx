import { useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';
import { GQL_LOGIN } from '../../graphql/mutations/auth';
import SimpleMessage from '../SimpleMessage/SimpleMessage';
import './styles.css';

const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error, data }] = useMutation(GQL_LOGIN);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      alert('you need to send a username and password!');
      return;
    }

    await login({
      variables: {
        data: {
          userName: username,
          password,
        },
      },
    });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <p>Username: </p>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
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
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </div>
        <button disabled={loading}>login</button>
      </form>
      {error ? <SimpleMessage message={error.message} type="error" /> : <></>}
      {!error && data ? (
        <SimpleMessage message="successfully logged in" type="success" />
      ) : (
        <></>
      )}
    </>
  );
};

export default LoginForm;
