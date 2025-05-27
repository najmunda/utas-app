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

  it('should return thread detail with added userId on upVotesBy array when given "UPVOTE_THREAD_DETAIL" action', () => {
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
        userId: 'test-user-upvote',
      },
    };

    const nextState = threadDetailReducer(initialState, upvoteAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      upVotesBy: ['test-user-upvote'],
    });
  });

  it('should return same state when given "UPVOTE_THREAD_DETAIL" action if upVotesBy array already has userId', () => {
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
      upVotesBy: ['test-user-upvote'],
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
        userId: 'test-user-upvote',
      },
    };

    const nextState = threadDetailReducer(initialState, upvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return thread detail with added userId on downVotesBy array when given "DOWNVOTE_THREAD_DETAIL" action', () => {
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
        userId: 'test-user-downvote',
      },
    };

    const nextState = threadDetailReducer(initialState, downvoteAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      downVotesBy: ['test-user-downvote'],
    });
  });

  it('should return same state when given "DOWNVOTE_THREAD_DETAIL" action if downVotesBy array already has userId', () => {
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
      downVotesBy: ['test-user-downvote'],
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
        userId: 'test-user-downvote',
      },
    };

    const nextState = threadDetailReducer(initialState, downvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return thread detail with empty upVotesBy array when given "UNVOTE_THREAD_DETAIL" action', () => {
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
      upVotesBy: ['test-user-unvote'],
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
        userId: 'test-user-unvote',
      },
    };

    const nextState = threadDetailReducer(initialState, unvoteAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      upVotesBy: [],
    });
  });

  it('should return thread detail with empty downVotesBy array when given "UNVOTE_THREAD_DETAIL" action', () => {
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
      downVotesBy: ['test-user-unvote'],
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
        userId: 'test-user-unvote',
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

  it('should return state with added userId on upVotesBy array on intended commentId when given "UPVOTE_COMMENT" action', () => {
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
        userId: 'test-user-upvote-comment',
      },
    };

    const nextState = threadDetailReducer(initialState, upvoteCommentAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      comments: [
        {
          ...comment,
          upVotesBy: ['test-user-upvote-comment'],
        },
      ],
    });
  });

  it('should return same state when given "UPVOTE_COMMENT" action if upVotesBy array on intended commentId already has userId', () => {
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
          upVotesBy: ['test-user-upvote-comment'],
          downVotesBy: [],
        },
      ],
    };
    const upvoteAction = {
      type: 'UPVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: 'test-user-upvote-comment',
      },
    };

    const nextState = threadDetailReducer(initialState, upvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return state with added userId on downVotesBy array on intended commentId when given "DOWNVOTE_COMMENT" action', () => {
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
        userId: 'test-user-downvote-comment',
      },
    };

    const nextState = threadDetailReducer(initialState, downvoteCommentAction);

    expect(nextState).toStrictEqual({
      ...initialState,
      comments: [
        {
          ...comment,
          downVotesBy: ['test-user-downvote-comment'],
        },
      ],
    });
  });

  it('should return same state when given "DOWNVOTE_COMMENT" action if downVotesBy array on intended commentId already has userId', () => {
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
          downVotesBy: ['test-user-downvote-comment'],
        },
      ],
    };
    const downvoteAction = {
      type: 'DOWNVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: 'test-user-downvote-comment',
      },
    };

    const nextState = threadDetailReducer(initialState, downvoteAction);

    expect(nextState).toStrictEqual(initialState);
  });

  it('should return state with empty upVotesBy array on intended commentId when given "UNVOTE_COMMENT" action', () => {
    const comment = {
      id: 'comment-tes',
      content: 'Ini adalah komentar tes',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-tes-2',
        name: 'Tes Dua',
        avatar: 'https://avatar-user-tes-2-url.jpg',
      },
      upVotesBy: ['test-user-unvote-comment'],
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
    const unvoteAction = {
      type: 'UNVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: 'test-user-unvote-comment',
      },
    };

    const nextState = threadDetailReducer(initialState, unvoteAction);

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

  it('should return state with empty downVotesBy array on intended commentId when given "UNVOTE_COMMENT" action', () => {
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
      downVotesBy: ['test-user-unvote-comment'],
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
    const unvoteAction = {
      type: 'UNVOTE_COMMENT',
      payload: {
        commentId: 'comment-tes',
        userId: 'test-user-unvote-comment',
      },
    };

    const nextState = threadDetailReducer(initialState, unvoteAction);

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
