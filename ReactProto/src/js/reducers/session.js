

import { INIT, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
  RESET_PASSWORD, RESET_PASSWORD_SUCCESS, LOGOUT } from '../actions/actions';

const initialState = {
  state: 'initial', // initial | changing | ready
  userName: undefined,
  token: undefined,
  passwordReset: false, // TODO: should come from the server
  role: undefined,
  error: undefined
};

function homeForRole (role) {
  if ('virtualization user' === role) {
    return '/virtual-machines';
  } else {
    return '/dashboard';
  }
}

const handlers = {
  [INIT]: (_, action) => ({
    userName: action.userName,
    home: homeForRole(action.role),
    token: action.token,
    role: action.role,
    passwordReset: action.passwordReset
  }),

  [LOGIN]: (_, action) => ({
    state: 'changing',
    userName: action.userName
  }),

  [LOGIN_SUCCESS]: (_, action) => ({
    state: 'ready',
    userName: action.userName,
    role: action.role,
    home: homeForRole(action.role),
    token: action.token,
    needPasswordReset: action.needPasswordReset,
    error: undefined
  }),

  [LOGIN_FAILURE]: (_, action) => ({
    state: 'initial',
    error: action.error
  }),

  [RESET_PASSWORD]: (_, action) => ({
    state: 'changing',
    error: undefined
  }),

  [RESET_PASSWORD_SUCCESS]: (_, action) => ({
    state: 'ready',
    needPasswordReset: false}),

  [LOGOUT]: () => ({
    state: 'initial',
    userName: null,
    token: undefined
  })
};

export default function sessionReducer (state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
