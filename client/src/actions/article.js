import axios from 'axios';
import {history} from '../routers/AppRouter';

// SET_ARTICLES
export const setArticles = articles => ({
  type: 'SET_ARTICLES',
  articles
});

const ROOT_URL = process.env.ROOT_URL || 'http://localhost:5000/';

export function startSetArticles() {
  return dispatch => {
    axios.get(`${ROOT_URL}article`).then(response => {
      dispatch(setArticles(response.data));
    });
  };
}

// SET_ARTICLE
export const setArticle = article => ({
  type: 'SET_ARTICLE',
  article
});

export const startSetArticle = _id => {
  return dispatch => {
    axios.get(`${ROOT_URL}article/${_id}`).then(response => {
      dispatch(setArticle(response.data));
    });
  };
};

// ADD_ARTICLE
export const addArticle = article => ({
  type: 'ADD_ARTICLE',
  article
});

export function startAddArticle({title, price, description}) {
  return dispatch => {
    axios
      .post(
        `${ROOT_URL}article/create`,
        {title, price, description},
        {
          headers: {authorization: localStorage.getItem('token')}
        }
      )
      .then(response => {
        dispatch(addArticle(response.data.article));
        history.push('/');
      })
      .catch(err => res.send(err));
  };
}

// EDIT_ARTICLE
export const editArticle = updatedArticle => ({
  type: 'EDIT_ARTICLE',
  updatedArticle
});

export const startEditArticle = ({
  _id,
  title,
  price,
  description,
  updated_at,
  user
}) => {
  return dispatch => {
    axios
      .put(
        `${ROOT_URL}article/${_id}`,
        {title, price, description, updated_at, user},
        {
          headers: {authorization: localStorage.getItem('token')}
        }
      )
      .then(response => {
        dispatch(editArticle(response.data.updatedArticle));
        history.push('/');
      });
  };
};

// REMOVE_ARTICLE
export const removeArticle = ({_id} = {}) => ({
  type: 'REMOVE_ARTICLE',
  _id
});

export const startRemoveArticle = ({_id}) => {
  return dispatch => {
    axios
      .delete(`${ROOT_URL}article/${_id}`, {
        _id: {_id},
        headers: {authorization: localStorage.getItem('token')}
      })
      .then(response => {
        dispatch(removeArticle({_id}));
        history.push('/');
      });
  };
};
