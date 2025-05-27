import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authedUserReducer from './authedUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import usersReducer from './users/reducer';

const store = configureStore({
  reducer: {
    authedUser: authedUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    users: usersReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
