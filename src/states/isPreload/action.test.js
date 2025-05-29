import {
  afterEach,
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import * as api from '../../utils/api';
import {
  asyncPreload,
  setIsPreloadActionCreator,
} from './action';
import { setAuthedUserActionCreator } from '../authedUser/action';

const fakeAuthedUserState = {
  id: 'user_tes',
  name: 'user tes',
  email: 'user@tes.com',
  avatar: 'https://avatar-user-tes.jpg',
};

const fakeErrorResponse = new Error('Error occured!');

describe('asyncPreload thunk function', () => {
  beforeEach(() => {
    api.tmp_getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api.tmp_getOwnProfile;
    delete api.tmp_getOwnProfile;
  });

  it('should dispatch loading bar and authedUser action with authed user data when data fetching success', async () => {
    const dispatch = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeAuthedUserState);

    await asyncPreload()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthedUserActionCreator(fakeAuthedUserState));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and authedUser action with null, and call alert correctly when data fetching failed', async () => {
    const dispatch = vi.fn();
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    window.alert = vi.fn();

    await asyncPreload()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthedUserActionCreator(null));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
