import { hideLoading, showLoading } from 'react-redux-loading-bar';
import * as api from '../../utils/api';

export const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

export function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

export function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.register({ name, email, password });
      alert('Registration success!');
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
