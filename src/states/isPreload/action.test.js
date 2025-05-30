import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  asyncPreload,
  setIsPreloadActionCreator,
} from './action';
import { setAuthedUserActionCreator } from '../authedUser/action';

const fakeToken = 'fakeToken';

const fakeOwnProfileResponse = {
  id: 'user_tes',
  name: 'user tes',
  email: 'user@tes.com',
  avatar: 'https://avatar-user-tes.jpg',
};

const fakeErrorResponse = new Error('Error occured!');

const dispatch = vi.fn();

window.alert = vi.fn();

vi.mock('../../utils/api', () => ({
  getToken: vi.fn(),
  getOwnProfile: vi.fn(),
}));

import * as api from '../../utils/api';

describe('asyncPreload thunk function', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should dispatch loading bar and authedUser action with authed user data when data fetching success', async () => {
    api.getToken.mockImplementation(() => fakeToken);
    api.getOwnProfile.mockImplementation(() => Promise.resolve(fakeOwnProfileResponse));

    await asyncPreload()(dispatch);

    console.log(dispatch.mock.calls);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthedUserActionCreator(fakeOwnProfileResponse));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and authedUser action with null, and call alert correctly when data fetching failed', async () => {
    api.getToken.mockImplementation(() => fakeToken);
    api.getOwnProfile.mockImplementation(() => Promise.reject(fakeErrorResponse));

    await asyncPreload()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthedUserActionCreator(null));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
