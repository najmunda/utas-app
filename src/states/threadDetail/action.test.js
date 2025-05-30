import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import {
  asyncUnvoteThreadDetail,
  downvoteThreadDetailActionCreator,
  unvoteThreadDetailActionCreator,
  upvoteThreadDetailActionCreator,
} from './action';

const fakeAuthedUserState = {
  id: 'user_tes',
  name: 'user tes',
  email: 'user@tes.com',
  avatar: 'https://avatar-user-tes.jpg',
};

const fakeThreadDetailState = {
  id: 'thread-tes',
  title: 'Thread Tes',
  body: 'Ini adalah thread tes',
  category: 'Tes',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-tes',
    name: 'Users Tes',
    avatar: 'https://avatar-user-tes-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-tes',
      content: 'Ini adalah komentar tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-tes-2',
        name: 'Tes Dua',
        avatar: 'https://avatar-user-tes-2-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const fakeErrorResponse = new Error('Error occured!');

const dispatch = vi.fn();
window.alert = vi.fn();
const getState = vi.fn();

vi.mock('../../utils/api', () => ({
  unvoteThread: vi.fn(),
}));

import * as api from '../../utils/api';

describe('asyncUnvoteThreadDetail thunk function', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should dispatch loading bar and unvote action when data fetching success', async () => {
    getState.mockImplementation(() => ({
      authedUser: fakeAuthedUserState,
      threadDetail: fakeThreadDetailState,
    }));
    api.unvoteThread.mockImplementation(() => Promise.resolve(true));

    await asyncUnvoteThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and upvote action, and call alert correctly when data fetching failed and users upvote before', async () => {
    getState.mockImplementation(() => ({
      authedUser: fakeAuthedUserState,
      threadDetail: {
        ...fakeThreadDetailState,
        upVotesBy: [fakeAuthedUserState.id],
      },
    }));
    api.unvoteThread.mockImplementation(() => Promise.reject(fakeErrorResponse));

    await asyncUnvoteThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(dispatch).toHaveBeenCalledWith(upvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and downvote action, and call alert correctly when data fetching failed and users downvote before', async () => {
    getState.mockImplementation(() => ({
      authedUser: fakeAuthedUserState,
      threadDetail: {
        ...fakeThreadDetailState,
        downVotesBy: [fakeAuthedUserState.id],
      },
    }));
    api.unvoteThread.mockImplementation(() => Promise.reject(fakeErrorResponse));

    await asyncUnvoteThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(dispatch)
      .toHaveBeenCalledWith(downvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
