import { hideLoading, showLoading } from 'react-redux-loading-bar';
import * as api from '../../utils/api';

export const ActionType = {
  SET_AUTHED_USER: 'SET_AUTHED_USER',
  UNSET_AUTHED_USER: 'UNSET_AUTHED_USER',
};

export function setAuthedUserActionCreator(authedUser) {
  return {
    type: ActionType.SET_AUTHED_USER,
    payload: {
      authedUser,
    },
  };
}

export function asyncSetAuthedUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.setToken(token);
      const authedUser = await api.getOwnProfile();
      dispatch(setAuthedUserActionCreator(authedUser));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function unsetAuthedUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTHED_USER,
    payload: {
      authedUser: null,
    },
  };
}

export function asyncUnsetAuthedUser() {
  return (dispatch) => {
    dispatch(showLoading());
    try {
      dispatch(unsetAuthedUserActionCreator());
      api.setToken('');
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
