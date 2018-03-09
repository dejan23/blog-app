import axios from 'axios';
import { history } from '../routers/AppRouter';
import config from '../../config/keys';
import {
   AUTH_USER,
   UNAUTH_USER,
   AUTH_ERROR,
   FETCH_MESSAGE,
   CLEAR_ALERT,
   SUCCESS_MESSAGE
  } from './types';

// const ROOT_URL = 'http://localhost:5000';

export function loginUser({ email, password}) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${config.rootURL}auth/login`, { email, password })
      .then(response => {
        const parsedJson = JSON.parse(response.config.data)
        const email = parsedJson.email
        localStorage.setItem('email', email);
        const getEmail = localStorage.getItem('email');

        // if req is good...
        // - update state to indicate user is auth
        dispatch({
          type: AUTH_USER,
          payload: email
         });
        // - save the JWT token
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        // - redirect to the special page
        history.push('/');
      })
      .catch(error => dispatch(authError(error.response.data.error)))
  }
}

export function logoutUser() {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('username')
  return { type: UNAUTH_USER }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function successMessage(success) {
  return {
    type: SUCCESS_MESSAGE,
    payload: success
  }
}


export function registerUser({ email, password, username, firstName, lastName, location, gender, day, month, year }) {
  return function(dispatch) {
    axios.post(`${config.rootURL}auth/register`, { email, password, username, firstName, lastName, location, gender, day, month, year })
      .then(response => {
        history.push('/register/success');
      })
      .catch(error => dispatch(authError(error.response.data.error)))
  }
}

export function verifyUser(token) {
  return function(dispatch) {
    axios.post(`${config.rootURL}auth/verify/${token}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => dispatch(authError(error.response.data.error)))
  }
}

export function resendToken(email) {
  return function(dispatch) {
    axios.put(`${config.rootURL}auth/resendToken`, {email})
      .then(response => {
        history.push('/');
      })
      .catch(error => dispatch(authError(error.response.data.error)))
  }
}

export function clearAlert() {
  return { type: CLEAR_ALERT }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(`${config.rootURL}feature`, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}
