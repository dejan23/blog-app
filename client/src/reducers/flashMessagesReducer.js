import { ADD_FLASH_MESSAGE, CLEAR_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid'
import findIndex from 'lodash/findIndex'

export default (state = {}, action = {}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return { ...state, message: action.message.message, type: action.message.type };
    case CLEAR_FLASH_MESSAGE:
      return { ...state, message: null, type: null  }
  }
  return state;
}
