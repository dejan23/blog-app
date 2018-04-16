import axios from 'axios';
import {history} from '../routers/AppRouter';

const ROOT_URL = process.env.ROOT_URL || 'http://localhost:5000';

// SET_USER
export const setUser = user => ({
  type: 'SET_USER',
  payload: user
});

export const userIsLoading = (bool) => ({
  type: 'USER_IS_LOADING',
  payload: bool
});

export const startSetUser = username => {
  return dispatch => {
    dispatch(userIsLoading(true))
    axios.get(`${ROOT_URL}/users/${username}`)
      .then(response => {
        dispatch(userIsLoading(false))
        dispatch(setUser(response.data));
      })
      .catch(error => {
        dispatch(userIsLoading(false))
      })
  };
};

// SET_USERS ALL
export const setUsers = users => ({
  type: 'SET_USERS',
  payload: users
});

export const startSetUsers = () => {
  return dispatch => {
    dispatch(userIsLoading(true))
    axios.get(`${ROOT_URL}/users`)
      .then(response => {
        dispatch(userIsLoading(false))
        dispatch(setUsers(response.data));
      })
      .catch(error => {
        dispatch(userIsLoading(false))
      })
  };
};

// SET_USER_UPDATE
export const setUserUpdate = user => ({
  type: 'SET_USER_UPDATE',
  payload: user
});

export const startSetUserUpdate =  ({username, email, location, city}) => {
  return async dispatch => {
    const localUsername = await localStorage.getItem('username');
    axios.patch(`${ROOT_URL}/users/${localUsername}`, { username, email, location, city })
    .then(async (response) => {
      await dispatch(setUserUpdate(response.data));
      await localStorage.setItem('username', response.data.username);
      const localUsername = await localStorage.getItem('username');
      history.push(`/users/${localUsername}`);
    });
  };
};
