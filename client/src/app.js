import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/LoadingPage';
import { AUTH_USER, FETCH_ARTICLES } from './actions/types';
import { startSetArticles } from './actions/article';
import AppRouter from './routers/AppRouter';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>
)

let hasRender = false;
const renderApp = () => {
  if(!hasRender) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRender = true
  }
}

ReactDOM.render(<LoadingPage />, document.getElementById('app'));


const token = localStorage.getItem('token')
if (token) {
  store.dispatch({ type: AUTH_USER })
  // store.dispatch(startSetArticles())
  setTimeout(() => {
    renderApp()
  },500)
  // renderApp()
} else {
  store.dispatch(startSetArticles())
  renderApp()
}
