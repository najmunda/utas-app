import { describe, expect, it } from 'vitest';
import authedUserReducer from './reducer';

describe('authedUserReducer function', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = {};
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const nextState = authedUserReducer(initialState, unknownAction);

    expect(nextState).toBe(initialState);
  });

  it('should return state with authed user data when given "SET_AUTHED_USER" action', () => {
    const initialState = {};
    const authedUserData = {
      id: 'user_test',
      name: 'User Test',
      email: 'user@test.com',
      avatar: 'https://avatar-test-url.jpg',
    };
    const setAction = {
      type: 'SET_AUTHED_USER',
      payload: {
        authedUser: authedUserData,
      },
    };

    const nextState = authedUserReducer(initialState, setAction);

    expect(nextState).toBe(authedUserData);
  });

  it('should return state with null when given "UNSET_AUTHED_USER" action', () => {
    const initialState = {
      id: 'user_test',
      name: 'User Test',
      email: 'user@test.com',
      avatar: 'https://avatar-test-url.jpg',
    };
    const unsetAction = {
      type: 'UNSET_AUTHED_USER',
    };

    const nextState = authedUserReducer(initialState, unsetAction);

    expect(nextState).toBe(null);
  });
});
