/**
 * test scenarios for users reducer
 *
 * - usersReducer function
 *   - should return initial state when given unknown action
 *   - should return state with users data when given "RECEIVE_USERS" action
 *
 */

import { describe, expect, it } from 'vitest';
import usersReducer from './reducer';

describe('usersReducer function', () => {
  it('should return initial state when given unknown action', () => {
    const initialState = [];
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const nextState = usersReducer(initialState, unknownAction);

    expect(nextState).toBe(initialState);
  });

  it('should return state with users data when given "RECEIVE_USERS" action', () => {
    const initialState = [];
    const receivedUsers = [
      {
        id: 'user_one',
        name: 'User One',
        email: 'one@user.com',
        avatar: 'https://avatar-one-url.jpg',
      },
      {
        id: 'user_two',
        name: 'User two',
        email: 'two@user.com',
        avatar: 'https://avatar-two-url.jpg',
      },
    ];
    const receiveAction = {
      type: 'RECEIVE_USERS',
      payload: {
        users: receivedUsers,
      },
    };

    const nextState = usersReducer(initialState, receiveAction);

    expect(nextState).toBe(receivedUsers);
  });
});
