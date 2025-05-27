import { ActionType } from './action';

export default function threadDetailReducer(threadDetail = {}, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.UPVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy
          : [...threadDetail.upVotesBy, action.payload.userId],
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter((userId) => userId !== action.payload.userId)
          : threadDetail.downVotesBy,
      };
    case ActionType.DOWNVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy
          : [...threadDetail.downVotesBy, action.payload.userId],
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((userId) => userId !== action.payload.userId)
          : threadDetail.upVotesBy,
      };
    case ActionType.UNVOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
          ? threadDetail.upVotesBy.filter((userId) => userId !== action.payload.userId)
          : threadDetail.upVotesBy,
        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
          ? threadDetail.downVotesBy.filter((userId) => userId !== action.payload.userId)
          : threadDetail.downVotesBy,
      };
    case ActionType.CREATE_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };
    case ActionType.UPVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const { payload } = action;
            const { upVotesBy, downVotesBy } = comment;
            return {
              ...comment,
              upVotesBy: upVotesBy.includes(payload.userId)
                ? upVotesBy
                : [...upVotesBy, payload.userId],
              downVotesBy: downVotesBy.includes(payload.userId)
                ? downVotesBy.filter((userId) => userId !== payload.userId)
                : downVotesBy,
            };
          }
          return comment;
        }),
      };
    case ActionType.DOWNVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const { payload } = action;
            const { upVotesBy, downVotesBy } = comment;
            return {
              ...comment,
              downVotesBy: downVotesBy.includes(payload.userId)
                ? downVotesBy
                : [...downVotesBy, payload.userId],
              upVotesBy: upVotesBy.includes(payload.userId)
                ? upVotesBy.filter((userId) => userId !== payload.userId)
                : upVotesBy,
            };
          }
          return comment;
        }),
      };
    case ActionType.UNVOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            const { payload } = action;
            const { upVotesBy, downVotesBy } = comment;
            return {
              ...comment,
              upVotesBy: upVotesBy.includes(payload.userId)
                ? upVotesBy.filter((userId) => userId !== payload.userId)
                : upVotesBy,
              downVotesBy: downVotesBy.includes(payload.userId)
                ? downVotesBy.filter((userId) => userId !== payload.userId)
                : downVotesBy,
            };
          }
          return comment;
        }),
      };
    default:
      return threadDetail;
  }
}
