import axios from 'axios';
import {history} from '../routers/AppRouter';

const ROOT_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://blog-app1.herokuapp.com';
// const local = 'http://localhost:5000';
// const ROOT_URL = process.env.ROOT_URL || local;

// SET_USER
export const setUser = user => ({
  type: 'SET_USER',
  payload: user
});

export const startSetUser = username => {
  return dispatch => {
    axios.get(`${ROOT_URL}/user/${username}`).then(response => {
      dispatch(setUser(response.data));
    });
  };
};

// SET_USERS ALL
export const setUsers = users => ({
  type: 'SET_USERS',
  payload: users
});

export const startSetUsers = () => {
  return dispatch => {
    axios.get(`${ROOT_URL}/users`).then(response => {
      dispatch(setUsers(response.data));
    });
  };
};
