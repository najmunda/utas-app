import {
  afterEach,
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncSetAuthedUser, setAuthedUserActionCreator } from './action';

const fakeAuthedUserState = {
  id: 'user_tes',
  name: 'user tes',
  email: 'user@tes.com',
  avatar: 'https://avatar-user-tes.jpg',
};

const fakeErrorResponse = new Error('Error occured!');

describe('asyncSetAuthedUser thunk function', () => {
  beforeEach(() => {
    api.tmp_login = api.login;
    api.tmp_setToken = api.setToken;
    api.tmp_getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api.tmp_login;
    api.setToken = api.tmp_setToken;
    api.getOwnProfile = api.tmp_getOwnProfile;
    delete api.tmp_login;
    delete api.tmp_setToken;
    delete api.tmp_getOwnProfile;
  });

  it('should dispatch loading bar and authedUser action when data fetching success', async () => {
    const dispatch = vi.fn();
    api.login = () => Promise.resolve('');
    api.setToken = () => null;
    api.getOwnProfile = () => Promise.resolve(fakeAuthedUserState);

    await asyncSetAuthedUser({
      email: 'user@test.com',
      password: 'testpassword',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthedUserActionCreator(fakeAuthedUserState));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and call alert correctly when data fetching failed', async () => {
    const dispatch = vi.fn();
    api.login = () => Promise.reject(fakeErrorResponse);
    api.setToken = () => null;
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    window.alert = vi.fn();

    await asyncSetAuthedUser({
      email: 'user@test.com',
      password: 'testpassword',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
