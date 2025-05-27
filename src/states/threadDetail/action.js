import { hideLoading, showLoading } from 'react-redux-loading-bar';
import * as api from '../../utils/api';

export const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  UPVOTE_THREAD_DETAIL: 'UPVOTE_THREAD_DETAIL',
  DOWNVOTE_THREAD_DETAIL: 'DOWNVOTE_THREAD_DETAIL',
  UNVOTE_THREAD_DETAIL: 'UNVOTE_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UPVOTE_COMMENT: 'UPVOTE_COMMENT',
  DOWNVOTE_COMMENT: 'DOWNVOTE_COMMENT',
  UNVOTE_COMMENT: 'UNVOTE_COMMENT',
};

export function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

export function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function unvoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UNVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

export function upvoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UPVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

export function downvoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

export function asyncUnvoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser, threadDetail } = getState();
    const userId = authedUser.id;
    const { upVotesBy, downVotesBy } = threadDetail;
    dispatch(unvoteThreadDetailActionCreator(userId));
    try {
      await api.unvoteThread(threadId);
    } catch (error) {
      if (upVotesBy.includes(userId)) {
        dispatch(upvoteThreadDetailActionCreator(userId));
      } else if (downVotesBy.includes(userId)) {
        dispatch(downvoteThreadDetailActionCreator(userId));
      }
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncUpvoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    const userId = authedUser.id;
    dispatch(upvoteThreadDetailActionCreator(userId));
    try {
      await api.upvoteThread(threadId);
    } catch (error) {
      dispatch(unvoteThreadDetailActionCreator(userId));
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncDownvoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    const userId = authedUser.id;
    dispatch(downvoteThreadDetailActionCreator(userId));
    try {
      await api.downvoteThread(threadId);
    } catch (error) {
      dispatch(unvoteThreadDetailActionCreator(userId));
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

export function asyncCreateComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function unvoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.UNVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

export function upvoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

export function downvoteCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

export function asyncUnvoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser, threadDetail } = getState();
    const userId = authedUser.id;
    const { comments } = threadDetail;
    const { upVotesBy, downVotesBy } = comments.find((comment) => comment.id === commentId);
    dispatch(unvoteCommentActionCreator(commentId, userId));
    try {
      await api.unvoteComment(threadId, commentId);
    } catch (error) {
      if (upVotesBy.includes(userId)) {
        dispatch(upvoteCommentActionCreator(commentId, userId));
      } else if (downVotesBy.includes(userId)) {
        dispatch(downvoteCommentActionCreator(commentId, userId));
      }
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncUpvoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    const userId = authedUser.id;
    dispatch(upvoteCommentActionCreator(commentId, userId));
    try {
      await api.upvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncDownvoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    const userId = authedUser.id;
    dispatch(downvoteCommentActionCreator(commentId, userId));
    try {
      await api.downvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}
