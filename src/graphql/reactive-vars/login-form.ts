import { makeVar, useReactiveVar } from '@apollo/client';

type LoginFormVar = {
  userName: string;
  password: string;
};

const initialValue = {
  userName: '',
  password: '',
};

const loginFormVarFn = makeVar(initialValue);

export const loginFormVar = {
  set: (p: LoginFormVar) => loginFormVarFn(p),
  get: () => loginFormVarFn(),
  reset: () => loginFormVarFn(initialValue),
  useLoginForm() {
    return useReactiveVar(loginFormVarFn);
  },
};
