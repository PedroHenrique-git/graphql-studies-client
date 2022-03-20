import { useLazyQuery, useMutation } from '@apollo/client';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import GQL_CREATE_USER from '../../graphql/mutations/create-user';
import { GQL_GET_USER } from '../../graphql/mutations/get-user';
import { GQL_UPDATE_USER } from '../../graphql/mutations/update-user';
import { useAuthVar } from '../../graphql/reactive-vars/auth';
import LoadingComponent from '../Loading/Loading';
import SimpleMessage from '../SimpleMessage/SimpleMessage';

type UserFormProps = {
  isEdit?: boolean;
};

const UserForm = ({ isEdit }: UserFormProps) => {
  const navigate = useNavigate();
  const authData = useAuthVar();

  const [createUser, { loading, error }] = useMutation(GQL_CREATE_USER, {
    onCompleted: () => {
      toast('You can login now!', {
        className: 'message',
      });
      navigate({ pathname: '/' });
    },
  });

  const [updateUser, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(GQL_UPDATE_USER, {
      onCompleted: async () => {
        //await logoutFn();
        toast('You data has been updated! you need to log in again!', {
          className: 'message',
        });
      },
    });

  const [getUser, { loading: loadingGet, error: errorGet, data: dataUser }] =
    useLazyQuery(GQL_GET_USER, {
      onCompleted: (data) => {
        setFirstName(data?.user.firstName);
        setLastName(data?.user.lastName);
        setUsername(data?.user.userName);
      },
    });

  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const returnEditedData = (): Record<string, string> => {
    const editData: Record<string, string> = {};

    if (firstName !== dataUser?.user.firstName) {
      editData.firstName = firstName;
    }

    if (lastName !== dataUser?.user.lastName) {
      editData.lastName = lastName;
    }

    if (username !== dataUser?.user.userName) {
      editData.userName = username;
    }

    return editData;
  };

  const handleForm = async (e: FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      await updateUser({
        variables: {
          userId: authData.userId,
          data: returnEditedData(),
        },
      });
      return;
    }

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

  useEffect(() => {
    if (!isEdit) return;

    getUser({
      variables: {
        userId: authData.userId,
      },
    });

    if (errorGet) {
      toast(errorGet.message, {
        className: 'message',
      });
    }
  }, [isEdit, getUser, authData.userId, errorGet]);

  if (loading || loadingGet) {
    return <LoadingComponent />;
  }

  return (
    <>
      <form onSubmit={handleForm}>
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
        <button disabled={loadingUpdate || loading}>
          {isEdit ? 'Edit user' : 'Sign-up'}
        </button>
      </form>
      {error || errorUpdate ? (
        <SimpleMessage
          message={error?.message || errorUpdate?.message || ''}
          type="error"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserForm;
