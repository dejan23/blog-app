import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SUCCESS_MESSAGE,
  FETCH_MESSAGE,
  CLEAR_ALERT
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, email: action.payload }
    case UNAUTH_USER:
      return { ...state, authenticated: false }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case SUCCESS_MESSAGE:
      return { ...state, success: action.payload }
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    case CLEAR_ALERT:
      return { ...state, error: null  }
  }

  return state;
}
