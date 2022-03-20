import { useMutation } from '@apollo/client';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GQL_CREATE_USER from '../../graphql/mutations/create-user';
import LoadingComponent from '../Loading/Loading';
import SimpleMessage from '../SimpleMessage/SimpleMessage';

type UserFormProps = {
  isEdit?: boolean;
};

const UserForm = ({ isEdit }: UserFormProps) => {
  const navigate = useNavigate();

  const [createUser, { loading, error }] = useMutation(GQL_CREATE_USER, {
    onCompleted: () => {
      toast('You can login now!', {
        className: 'message',
      });
      navigate({ pathname: '/login' });
    },
  });

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    await createUser({
      variables: {
        data: {
          firstName,
          lastName,
          password,
          userName: username,
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
          <p>First name: </p>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="input-group">
          <p>Last name: </p>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="input-group">
          <p>Username: </p>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button>{isEdit ? 'Edit user' : 'Sign-up'}</button>
      </form>
      {error ? <SimpleMessage message={error.message} type="error" /> : <></>}
    </>
  );
};

export default UserForm;
