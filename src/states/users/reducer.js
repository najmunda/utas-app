import { ActionType } from './action';

export default function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload.user; // Intended Error Here
    default:
      return users;
  }
}
