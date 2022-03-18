import { makeVar, useReactiveVar } from '@apollo/client';

const authVarId = '__auth_data__';

const initialValue = {
  userName: '',
  userId: '',
  isLoggedIn: false,
};

const authVar = makeVar(initialValue);

const setVar = (userName = '', userId = '', isLoggedIn = false) => {
  const authData = { userName, userId, isLoggedIn };
  localStorage.setItem(authVarId, JSON.stringify(authData));
  authVar(authData);
};

const getVar = () => authVar();

const resetVar = () => {
  localStorage.removeItem(authVarId);
  authVar({ ...initialValue });
};

const hydrate = () => {
  const localDataStr = localStorage.getItem(authVarId);
  const authVarData = getVar();

  if (!localDataStr) {
    if (authVarData.isLoggedIn) {
      resetVar();
    }
    return;
  }

  if (localDataStr === JSON.stringify(authVarData)) return;

  const localDataObj: {
    userName: string;
    userId: string;
    isLoggedIn: boolean;
  } = JSON.parse(localDataStr);

  const { userName, userId, isLoggedIn } = localDataObj;

  setVar(userName, userId, isLoggedIn);
};

export const useAuthVar = () => {
  authDataManager.hydrate();
  return useReactiveVar(authVar);
};

export const authDataManager = {
  setVar,
  getVar,
  resetVar,
  hydrate,
};
