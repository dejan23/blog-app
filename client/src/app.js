import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import { AUTH_USER } from './actions/types';

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import AppRouter from './routers/AppRouter';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>
)

const token = localStorage.getItem('token')
if (token) {
  store.dispatch({ type: AUTH_USER })
}


ReactDOM.render(jsx, document.getElementById('app'));