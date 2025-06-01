/**
 * test scenarios for shared action
 *
 * - asyncReceiveUsersAndThreads thunk function
 *   - should dispatch loading bar, users, and threads action when data fetching success
 *   - should dispatch loading bar and call alert correctly when data fetching failed
 *
 */

import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import asyncReceiveUsersAndThreads from './action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';

import * as api from '../../utils/api';

const fakeUsersResponse = [
  {
    id: 'user_one',
    name: 'User One',
    email: 'one@user.com',
    avatar: 'https://avatar-one-url.jpg',
  },
  {
    id: 'user_two',
    name: 'User two',
    email: 'two@user.com',
    avatar: 'https://avatar-two-url.jpg',
  },
];

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread One',
    body: 'This is first test thread',
    category: 'Tes',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'user-one',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Two',
    body: 'This is second test thread',
    category: 'Tes',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'user-two',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error('Error occured!');

const dispatch = vi.fn();
window.alert = vi.fn();

vi.mock('../../utils/api', () => ({
  getUsers: vi.fn(),
  getThreads: vi.fn(),
}));

describe('asyncReceiveUsersAndThreads thunk function', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should dispatch loading bar, users, and threads action when data fetching success', async () => {
    api.getUsers.mockImplementation(() => Promise.resolve(fakeUsersResponse));
    api.getThreads.mockImplementation(() => Promise.resolve(fakeThreadsResponse));

    await asyncReceiveUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and call alert correctly when data fetching failed', async () => {
    api.getUsers.mockImplementation(() => Promise.reject(fakeErrorResponse));
    api.getThreads.mockImplementation(() => Promise.reject(fakeErrorResponse));

    await asyncReceiveUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
