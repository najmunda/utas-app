import { ActionType } from './action';

export default function authedUserReducer(authedUser = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTHED_USER:
      return action.payload.authedUser;
    case ActionType.UNSET_AUTHED_USER:
      return null;
    default:
      return authedUser;
  }
}
