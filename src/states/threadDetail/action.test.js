import {
  afterEach,
  beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import * as api from '../../utils/api';
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

describe('asyncUnvoteThreadDetail thunk function', () => {
  beforeEach(() => {
    api.tmp_unvoteThread = api.unvoteThread;
  });

  afterEach(() => {
    api.unvoteThread = api.tmp_unvoteThread;
    delete api.tmp_unvoteThread;
  });

  it('should dispatch loading bar and unvote action when data fetching success', async () => {
    const dispatch = vi.fn();
    const getState = () => ({
      authedUser: fakeAuthedUserState,
      threadDetail: fakeThreadDetailState,
    });
    api.unvoteThread = () => Promise.resolve(true);

    await asyncUnvoteThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and upvote action, and call alert correctly when data fetching failed and users upvote before', async () => {
    const dispatch = vi.fn();
    const getState = () => ({
      authedUser: fakeAuthedUserState,
      threadDetail: {
        ...fakeThreadDetailState,
        upVotesBy: [fakeAuthedUserState.id],
      },
    });
    api.unvoteThread = () => Promise.reject(fakeErrorResponse);
    window.alert = vi.fn();

    await asyncUnvoteThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(dispatch).toHaveBeenCalledWith(upvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch loading bar and downvote action, and call alert correctly when data fetching failed and users downvote before', async () => {
    const dispatch = vi.fn();
    const getState = () => ({
      authedUser: fakeAuthedUserState,
      threadDetail: {
        ...fakeThreadDetailState,
        downVotesBy: [fakeAuthedUserState.id],
      },
    });
    api.unvoteThread = () => Promise.reject(fakeErrorResponse);
    window.alert = vi.fn();

    await asyncUnvoteThreadDetail()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(dispatch)
      .toHaveBeenCalledWith(downvoteThreadDetailActionCreator(fakeAuthedUserState.id));
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
