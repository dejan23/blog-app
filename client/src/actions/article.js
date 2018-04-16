import axios from 'axios';
import {history} from '../routers/AppRouter';

const ROOT_URL = process.env.ROOT_URL || 'http://localhost:5000';

export function successMessage(success) {
  return {
    type: 'SUCCESS_MESSAGE',
    payload: success
  };
}

export const clearFlashMessage = () => ({
  type: 'CLEAR_FLASH_MESSAGE'
})

// SEARCH
export const setSearch = searchResult => ({
  type: 'SET_SEARCH',
  payload: searchResult
});

export const searchFail = (error) => ({
  type: 'SEARCH_FAIL',
  payload: error
})

export const clearSearch = () => ({
  type: 'CLEAR_SEARCH'
})

export function startSearch (title, sort) {
  return dispatch => {
    axios.get(`${ROOT_URL}/search?title=${title}&sort=${sort}`).then(response => {
      dispatch(setSearch(response.data))

    })
    .catch(error => {
      dispatch(clearSearch())
      dispatch(searchFail(error.response.data.error))
    })
  };
}

// SET_ARTICLES
export const setArticles = articles => ({
  type: 'SET_ARTICLES',
  payload: articles
});

export const articlesIsLoading = (bool) => ({
  type: 'ARTICLES_IS_LOADING',
  payload: bool
});

export function startSetArticles (query) {
  return dispatch => {
    dispatch(articlesIsLoading(true))
    axios.get(`${ROOT_URL}/articles?sort=${query}`)
      .then(response => {
        dispatch(articlesIsLoading(false))
        dispatch(setArticles(response.data));
      })
      .catch(error => {
        dispatch(articlesIsLoading(false))
        dispatch(clearSearch())
        dispatch(searchFail(error.response.data.error))
      })
  };
}

// SET_ARTICLE
export const setArticle = article => ({
  type: 'SET_ARTICLE',
  payload: article
});

export function startSetArticle(_id) {
  return dispatch => {
    dispatch(articlesIsLoading(true))
    axios.get(`${ROOT_URL}/articles/${_id}`)
      .then(response => {
        dispatch(articlesIsLoading(false))
        dispatch(setArticle(response.data));
      })
      .catch(error => {
        dispatch(articlesIsLoading(false))
      })
  };
};

// SET_USER_ARTICLES
export const setUserArticles = articles => ({
  type: 'SET_USER_ARTICLES',
  payload: articles
});

export function startSetUserArticles(_id) {
  return dispatch => {
    axios.get(`${ROOT_URL}/users/${_id}/articles`).then(response => {
      dispatch(setUserArticles(response.data));
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
        `${ROOT_URL}/articles`,
        {title, price, description},
        {
          headers: {authorization: localStorage.getItem('token')}
        }
      )
      .then(response => {
        dispatch(addArticle(response.data.article));
        dispatch(successMessage(response.data.success))
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

export const startEditArticle = ({ _id, title, price, description }) => {
  return dispatch => {
    axios.patch(`${ROOT_URL}/articles/${_id}`, {title, price, description },
        {
          headers: {authorization: localStorage.getItem('token')}
        }
      )
      .then(response => {
        dispatch(editArticle(response.data));
        dispatch(successMessage(response.data.success))
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
    axios.delete(`${ROOT_URL}/articles/${_id}`, {
        id: {_id},
        headers: {authorization: localStorage.getItem('token')}
      })
      .then(response => {
        dispatch(removeArticle({_id}));
        dispatch(successMessage(response.data.success))
        history.push('/');
      });
  };
};
