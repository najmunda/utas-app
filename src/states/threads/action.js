import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  UNVOTE_THREAD: 'UNVOTE_THREAD',
};

export function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

export function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

export function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function unvoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.UNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function upvoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function downvoteThreadActionCreator(threadId, userId) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

export function asyncUnvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser, threads } = getState();
    const userId = authedUser.id;
    const { upVotesBy, downVotesBy } = threads.find((thread) => thread.id === threadId);
    dispatch(unvoteThreadActionCreator(threadId, userId));
    try {
      await api.unvoteThread(threadId);
    } catch (error) {
      if (upVotesBy.includes(userId)) {
        dispatch(upvoteThreadActionCreator(threadId, userId));
      } else if (downVotesBy.includes(userId)) {
        dispatch(downvoteThreadActionCreator(threadId, userId));
      }
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    const userId = authedUser.id;
    dispatch(upvoteThreadActionCreator(threadId, userId));
    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      dispatch(unvoteThreadActionCreator(threadId, userId));
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    const userId = authedUser.id;
    dispatch(downvoteThreadActionCreator(threadId, userId));
    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      dispatch(unvoteThreadActionCreator(threadId, userId));
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
