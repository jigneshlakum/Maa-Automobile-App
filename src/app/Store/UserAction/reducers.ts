import { createReducer, on } from '@ngrx/store';

import { AuthState } from '../../Shared/Models/UserModel';
import { login, loginFailure, loginSuccess } from './actions';


export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
