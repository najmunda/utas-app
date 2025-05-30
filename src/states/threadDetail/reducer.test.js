import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = {};
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const nextState = threadDetailReducer(initialState, unknownAction);

    expect(nextState).toBe(initialState);
  });

  it('should return state with thread detail data when given "RECEIVE_THREAD_DETAIL" action', () => {
    const initialState = {};
    const threadDetail = {
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
    const receiveAction = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail,
      },
    };

    const nextState = threadDetailReducer(initialState, receiveAction);

    expect(nextState).toBe(threadDetail);
  });

  it('should return state with authed user id on upVotesBy array when given "UPVOTE_THREAD_DETAIL" action', () => {
    const authedUserId = 'test-authed-user';
    const initialState = {
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
    const upvoteAction = {
      type: 'UPVOTE_THREAD_DETAIL',
      payload: {
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, upvoteAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      upVotesBy: [authedUserId],
    });
  });

  it('should return same state when given "UPVOTE_THREAD_DETAIL" action if upVotesBy array already has authed user id', () => {
    const authedUserId = 'test-authed-user';
    const initialState = {
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
      upVotesBy: [authedUserId],
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
    const upvoteAction = {
      type: 'UPVOTE_THREAD_DETAIL',
      payload: {
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, upvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return state with authed user id on downVotesBy array when given "DOWNVOTE_THREAD_DETAIL" action', () => {
    const authedUserId = 'test-authed-user';
    const initialState = {
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
    const downvoteAction = {
      type: 'DOWNVOTE_THREAD_DETAIL',
      payload: {
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, downvoteAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      downVotesBy: [authedUserId],
    });
  });

  it('should return same state when given "DOWNVOTE_THREAD_DETAIL" action if downVotesBy array already has authed user id', () => {
    const authedUserId = 'test-authed-user';
    const initialState = {
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
      downVotesBy: [authedUserId],
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
    const downvoteAction = {
      type: 'DOWNVOTE_THREAD_DETAIL',
      payload: {
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, downvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return state with authed user id not included in upVotesBy array when given "UNVOTE_THREAD_DETAIL" action', () => {
    const authedUserId = 'test-authed-user';
    const initialState = {
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
      upVotesBy: [authedUserId],
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
    const unvoteAction = {
      type: 'UNVOTE_THREAD_DETAIL',
      payload: {
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, unvoteAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      upVotesBy: [],
    });
  });

  it('should return state with authed user id not included in downVotesBy array when given "UNVOTE_THREAD_DETAIL" action', () => {
    const authedUserId = 'test-authed-user';
    const initialState = {
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
      downVotesBy: [authedUserId],
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
    const unvoteAction = {
      type: 'UNVOTE_THREAD_DETAIL',
      payload: {
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, unvoteAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      downVotesBy: [],
    });
  });

  it('should return state with created comment on comments array when given "CREATE_COMMENT" action', () => {
    const initialState = {
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
      comments: [],
    };
    const createdComment = {
      id: 'comment-tes',
      content: 'Ini adalah komentar tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-tes-komentar',
        name: 'Tes Komentar',
        avatar: 'https://avatar-user-tes-comment-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const createCommentAction = {
      type: 'CREATE_COMMENT',
      payload: {
        comment: createdComment,
      },
    };

    const nextState = threadDetailReducer(initialState, createCommentAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      comments: [
        createdComment,
      ],
    });
  });

  it('should return state with added authed user id on upVotesBy array on intended commentId when given "UPVOTE_COMMENT" action', () => {
    const authedUserId = 'test-authed-user';
    const comment = {
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
    };
    const initialState = {
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
        comment,
      ],
    };
    const upvoteCommentAction = {
      type: 'UPVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, upvoteCommentAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      comments: [
        {
          ...comment,
          upVotesBy: [authedUserId],
        },
      ],
    });
  });

  it('should return same state when given "UPVOTE_COMMENT" action if upVotesBy array on intended commentId already has authed user id', () => {
    const authedUserId = 'test-authed-user';
    const initialState = {
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
          upVotesBy: [authedUserId],
          downVotesBy: [],
        },
      ],
    };
    const upvoteCommentAction = {
      type: 'UPVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, upvoteCommentAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return state with added authed user id on downVotesBy array on intended commentId when given "DOWNVOTE_COMMENT" action', () => {
    const authedUserId = 'test-authed-user';
    const comment = {
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
    };
    const initialState = {
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
        comment,
      ],
    };
    const downvoteCommentAction = {
      type: 'DOWNVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, downvoteCommentAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      comments: [
        {
          ...comment,
          downVotesBy: [authedUserId],
        },
      ],
    });
  });

  it('should return same state when given "DOWNVOTE_COMMENT" action if downVotesBy array on intended commentId already has authed user id', () => {
    const authedUserId = 'test-authed-user';
    const initialState = {
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
          downVotesBy: [authedUserId],
        },
      ],
    };
    const downvoteCommentAction = {
      type: 'DOWNVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, downvoteCommentAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return state with authed user id not included in upVotesBy array on intended commentId when given "UNVOTE_COMMENT" action', () => {
    const authedUserId = 'test-authed-user';
    const comment = {
      id: 'comment-tes',
      content: 'Ini adalah komentar tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-tes-2',
        name: 'Tes Dua',
        avatar: 'https://avatar-user-tes-2-url.jpg',
      },
      upVotesBy: [authedUserId],
      downVotesBy: [],
    };
    const initialState = {
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
        comment,
      ],
    };
    const unvoteCommentAction = {
      type: 'UNVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, unvoteCommentAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      comments: [
        {
          ...comment,
          upVotesBy: [],
        },
      ],
    });
  });

  it('should return state with authed user id not included in downVotesBy array on intended commentId when given "UNVOTE_COMMENT" action', () => {
    const authedUserId = 'test-authed-user';
    const comment = {
      id: 'comment-tes',
      content: 'Ini adalah komentar tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-tes-2',
        name: 'Tes Dua',
        avatar: 'https://avatar-user-tes-2-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [authedUserId],
    };
    const initialState = {
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
        comment,
      ],
    };
    const unvoteCommentAction = {
      type: 'UNVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: authedUserId,
      },
    };

    const nextState = threadDetailReducer(initialState, unvoteCommentAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      comments: [
        {
          ...comment,
          downVotesBy: [],
        },
      ],
    });
  });
});
