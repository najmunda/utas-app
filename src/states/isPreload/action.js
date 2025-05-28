import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthedUserActionCreator } from '../authedUser/action';

export const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

export function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

export function asyncPreload() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const authedUser = await api.getOwnProfile();
      dispatch(setAuthedUserActionCreator(authedUser));
    } catch (error) {
      dispatch(setAuthedUserActionCreator(null));
      alert(error.message);
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
    dispatch(hideLoading());
  };
}
