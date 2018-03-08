import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import articlesReducer from './articlesReducer';
import flashMessagesReducer from './flashMessagesReducer';
import userReducer from './userReducer';

const rootReducer = {
  auth: authReducer,
  articles: articlesReducer,
  flashMessages: flashMessagesReducer,
  form: formReducer,
  user: userReducer
};

export default rootReducer;
