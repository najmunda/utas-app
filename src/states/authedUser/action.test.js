/**
 * test scenarios for authedUser action
 *
 * - asyncSetAuthedUser thunk function
 *   - should dispatch loading bar and authedUser action when data fetching success
 *   - should dispatch loading bar and call alert correctly when data fetching failed
 *
 */

import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncSetAuthedUser, setAuthedUserActionCreator } from './action';

import * as api from '../../utils/api';

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
  login: vi.fn(),
  setToken: () => null,
  getOwnProfile: vi.fn(),
}));

describe('asyncSetAuthedUser thunk function', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should dispatch loading bar and authedUser action when data fetching success', async () => {
    api.login.mockImplementation(() => Promise.resolve(fakeToken));
    api.getOwnProfile.mockImplementation(() => Promise.resolve(fakeOwnProfileResponse));

    await asyncSetAuthedUser({
      email: 'user@test.com',
      password: 'testpassword',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthedUserActionCreator(fakeOwnProfileResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and call alert correctly when data fetching failed', async () => {
    api.login.mockImplementation(() => Promise.reject(fakeErrorResponse));
    api.getOwnProfile.mockImplementation(() => Promise.reject(fakeErrorResponse));

    await asyncSetAuthedUser({
      email: 'user@test.com',
      password: 'testpassword',
    })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
