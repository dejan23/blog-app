import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

import reducers from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;

export default () => {
  const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(thunk))
    // applyMiddleware(thunk)
  );

  return store;
}
