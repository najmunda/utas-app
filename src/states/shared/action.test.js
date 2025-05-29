import {
  afterEach,
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import * as api from '../../utils/api';
import asyncReceiveUsersAndThreads from './action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';

const fakeUsersState = [
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

const fakeThreadsState = [
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

describe('asyncReceiveUsersAndThreads thunk function', () => {
  beforeEach(() => {
    api.tmp_getUsers = api.getUsers;
    api.tmp_getThreads = api.getThreads;
  });

  afterEach(() => {
    api.getUsers = api.tmp_getUsers;
    api.getThreads = api.tmp_getThreads;
    delete api.tmp_getUsers;
    delete api.tmp_getThreads;
  });

  it('should dispatch loading bar, users, and threads action when data fetching success', async () => {
    const dispatch = vi.fn();
    api.getUsers = () => Promise.resolve(fakeUsersState);
    api.getThreads = () => Promise.resolve(fakeThreadsState);

    await asyncReceiveUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersState));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsState));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and call alert correctly when data fetching failed', async () => {
    const dispatch = vi.fn();
    api.getUsers = () => Promise.reject(fakeErrorResponse);
    api.getThreads = () => Promise.reject(fakeErrorResponse);
    window.alert = vi.fn();

    await asyncReceiveUsersAndThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
