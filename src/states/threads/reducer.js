import { ActionType } from './action';

export default function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.CREATE_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.UPVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { payload } = action;
          const { upVotesBy, downVotesBy } = thread;
          return {
            ...thread,
            upVotesBy: upVotesBy.includes(payload.userId)
              ? upVotesBy
              : [...upVotesBy, payload.userId],
            downVotesBy: downVotesBy.includes(payload.userId)
              ? downVotesBy.filter((userId) => userId !== payload.userId)
              : downVotesBy,
          };
        }
        return thread;
      });
    case ActionType.DOWNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { payload } = action;
          const { upVotesBy, downVotesBy } = thread;
          return {
            ...thread,
            downVotesBy: downVotesBy.includes(payload.userId)
              ? downVotesBy
              : [...downVotesBy, payload.userId],
            upVotesBy: upVotesBy.includes(payload.userId)
              ? upVotesBy.filter((userId) => userId !== payload.userId)
              : upVotesBy,
          };
        }
        return thread;
      });
    case ActionType.UNVOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { payload } = action;
          const { upVotesBy, downVotesBy } = thread;
          return {
            ...thread,
            upVotesBy: upVotesBy.includes(payload.userId)
              ? upVotesBy.filter((userId) => userId !== payload.userId)
              : upVotesBy,
            downVotesBy: downVotesBy.includes(payload.userId)
              ? downVotesBy.filter((userId) => userId !== payload.userId)
              : downVotesBy,
          };
        }
        return thread;
      });
    default:
      return threads;
  }
}
