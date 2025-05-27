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

  it('should return state with created thread data when given "CREATE_THREAD" action', () => {
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
    const createAction = {
      type: 'CREATE_THREAD',
      payload: {
        thread: {
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
      },
    };

    const nextState = threadsReducer(initialState, createAction);

    expect(nextState).toStrictEqual([
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
    ]);
  });

  it('should return state with added userId on upVotesBy array on intended threadId when given "UPVOTE_THREAD" action', () => {
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
    const upvoteAction = {
      type: 'UPVOTE_THREAD',
      payload: {
        threadId: 'thread-tes',
        userId: 'test-user-3',
      },
    };

    const nextState = threadsReducer(initialState, upvoteAction);

    expect(nextState).toStrictEqual([
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: ['test-user-3'],
        downVotesBy: [],
        totalComments: 0,
      },
    ]);
  });

  it('should return same state when given "UPVOTE_THREAD" action if upVotesBy array on intended threadId already has userId', () => {
    const initialState = [
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: ['test-user-3'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const upvoteAction = {
      type: 'UPVOTE_THREAD',
      payload: {
        threadId: 'thread-tes',
        userId: 'test-user-3',
      },
    };

    const nextState = threadsReducer(initialState, upvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return state with added userId on downVotesBy array on intended threadId when given "DOWNVOTE_THREAD" action', () => {
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
    const downvoteAction = {
      type: 'DOWNVOTE_THREAD',
      payload: {
        threadId: 'thread-tes',
        userId: 'test-user-3',
      },
    };

    const nextState = threadsReducer(initialState, downvoteAction);

    expect(nextState).toStrictEqual([
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: [],
        downVotesBy: ['test-user-3'],
        totalComments: 0,
      },
    ]);
  });

  it('should return same state when given "DOWNVOTE_THREAD" action if downVotesBy array on intended threadId already has userId', () => {
    const initialState = [
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: [],
        downVotesBy: ['test-user-3'],
        totalComments: 0,
      },
    ];
    const downvoteAction = {
      type: 'DOWNVOTE_THREAD',
      payload: {
        threadId: 'thread-tes',
        userId: 'test-user-3',
      },
    };

    const nextState = threadsReducer(initialState, downvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return threads with empty upVotesBy array on intended threadId when given "UNVOTE_THREAD" action', () => {
    const initialState = [
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: ['test-user-1', 'test-user-unvote'],
        downVotesBy: ['test-user-2'],
        totalComments: 0,
      },
    ];
    const unvoteAction = {
      type: 'UNVOTE_THREAD',
      payload: {
        threadId: 'thread-tes',
        userId: 'test-user-unvote',
      },
    };

    const nextState = threadsReducer(initialState, unvoteAction);

    expect(nextState).toStrictEqual([
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: ['test-user-1'],
        downVotesBy: ['test-user-2'],
        totalComments: 0,
      },
    ]);
  });

  it('should return threads with empty downVotesBy array on intended threadId when given "UNVOTE_THREAD" action', () => {
    const initialState = [
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: ['test-user-1'],
        downVotesBy: ['test-user-2', 'test-user-unvote'],
        totalComments: 0,
      },
    ];
    const unvoteAction = {
      type: 'UNVOTE_THREAD',
      payload: {
        threadId: 'thread-tes',
        userId: 'test-user-unvote',
      },
    };

    const nextState = threadsReducer(initialState, unvoteAction);

    expect(nextState).toStrictEqual([
      {
        id: 'thread-tes',
        title: 'Thread Tes',
        body: 'Ini adalah thread tes',
        category: 'Tes',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-tes',
        upVotesBy: ['test-user-1'],
        downVotesBy: ['test-user-2'],
        totalComments: 0,
      },
    ]);
  });
});
