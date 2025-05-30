import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = [
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const nextState = threadsReducer(initialState, unknownAction);

    expect(nextState).toBe(initialState);
  });

  it('should return state with threads data when given "RECEIVE_THREADS" action', () => {
    const initialState = [];
    const threads = [
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-tes-2',
        title: 'Thread Tes 2',
        body: 'Ini adalah thread tes 2',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 5,
      },
    ];
    const receiveAction = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads,
      },
    };

    const nextState = threadsReducer(initialState, receiveAction);

    expect(nextState).toBe(threads);
  });

  it('should return state with appended created thread data when given "CREATE_THREAD" action', () => {
    const initialState = [
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const createdThread = {
      id: 'thread-tes-2',
      title: 'Thread Tes 2',
      body: 'Ini adalah thread tes 2',
      category: 'Tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-tes-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 5,
    };
    const createAction = {
      type: 'CREATE_THREAD',
      payload: {
        thread: createdThread,
      },
    };

    const nextState = threadsReducer(initialState, createAction);

    expect(nextState).toStrictEqual([
      createdThread,
      ...initialState,
    ]);
  });

  it('should return state with added userId on upVotesBy array on intended threadId when given "UPVOTE_THREAD" action', () => {
    const authedUserId = 'test-authed-user';
    const targetThread = {
      id: 'thread-tes',
      title: 'Thread Tes',
      body: 'Ini adalah thread tes',
      category: 'Tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-tes',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const initialState = [
      targetThread,
    ];
    const upvoteAction = {
      type: 'UPVOTE_THREAD',
      payload: {
        threadId: targetThread.id,
        userId: authedUserId,
      },
    };

    const nextState = threadsReducer(initialState, upvoteAction);

    expect(nextState).toStrictEqual([
      {
        ...targetThread,
        upVotesBy: [authedUserId],
      },
    ]);
  });

  it('should return same state when given "UPVOTE_THREAD" action if upVotesBy array on intended threadId already has userId', () => {
    const authedUserId = 'test-authed-user';
    const targetThread = {
      id: 'thread-tes',
      title: 'Thread Tes',
      body: 'Ini adalah thread tes',
      category: 'Tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-tes',
      upVotesBy: [authedUserId],
      downVotesBy: [],
      totalComments: 0,
    };
    const initialState = [
      targetThread,
    ];
    const upvoteAction = {
      type: 'UPVOTE_THREAD',
      payload: {
        threadId: targetThread.id,
        userId: authedUserId,
      },
    };

    const nextState = threadsReducer(initialState, upvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return state with added userId on downVotesBy array on intended threadId when given "DOWNVOTE_THREAD" action', () => {
    const authedUserId = 'test-authed-user';
    const targetThread = {
      id: 'thread-tes',
      title: 'Thread Tes',
      body: 'Ini adalah thread tes',
      category: 'Tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-tes',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const initialState = [
      targetThread,
    ];
    const downvoteAction = {
      type: 'DOWNVOTE_THREAD',
      payload: {
        threadId: targetThread.id,
        userId: authedUserId,
      },
    };

    const nextState = threadsReducer(initialState, downvoteAction);

    expect(nextState).toStrictEqual([
      {
        ...targetThread,
        downVotesBy: [authedUserId],
      },
    ]);
  });

  it('should return same state when given "DOWNVOTE_THREAD" action if downVotesBy array on intended threadId already has userId', () => {
    const authedUserId = 'test-authed-user';
    const targetThread = {
      id: 'thread-tes',
      title: 'Thread Tes',
      body: 'Ini adalah thread tes',
      category: 'Tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-tes',
      upVotesBy: [],
      downVotesBy: [authedUserId],
      totalComments: 0,
    };
    const initialState = [targetThread];
    const downvoteAction = {
      type: 'DOWNVOTE_THREAD',
      payload: {
        threadId: targetThread.id,
        userId: authedUserId,
      },
    };

    const nextState = threadsReducer(initialState, downvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return state with authed user id not included in upVotesBy array on intended threadId when given "UNVOTE_THREAD" action', () => {
    const authedUserId = 'test-authed-user';
    const targetThread = {
      id: 'thread-tes',
      title: 'Thread Tes',
      body: 'Ini adalah thread tes',
      category: 'Tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-tes',
      upVotesBy: ['test-user-1', authedUserId],
      downVotesBy: ['test-user-2'],
      totalComments: 0,
    };
    const initialState = [targetThread];
    const unvoteAction = {
      type: 'UNVOTE_THREAD',
      payload: {
        threadId: targetThread.id,
        userId: authedUserId,
      },
    };

    const nextState = threadsReducer(initialState, unvoteAction);

    expect(nextState).toStrictEqual([
      {
        ...targetThread,
        upVotesBy: ['test-user-1'],
      },
    ]);
  });

  it('should return state with authed user id not included in downVotesBy array on intended threadId when given "UNVOTE_THREAD" action', () => {
    const authedUserId = 'test-authed-user';
    const targetThread = {
      id: 'thread-tes',
      title: 'Thread Tes',
      body: 'Ini adalah thread tes',
      category: 'Tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-tes',
      upVotesBy: ['test-user-1'],
      downVotesBy: ['test-user-2', authedUserId],
      totalComments: 0,
    };
    const initialState = [targetThread];
    const unvoteAction = {
      type: 'UNVOTE_THREAD',
      payload: {
        threadId: targetThread.id,
        userId: authedUserId,
      },
    };

    const nextState = threadsReducer(initialState, unvoteAction);

    expect(nextState).toStrictEqual([
      {
        ...targetThread,
        downVotesBy: ['test-user-2'],
      },
    ]);
  });
});
