import axios from 'axios';
import { history } from '../routers/AppRouter';
const config = require('../../envConfig/keys');

// const ROOT_URL = process.env.ROOT_URL || 'http://localhost:5000';

// SET_USER
export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user
})

export const startSetUser = (username) => {
  return (dispatch) => {
    axios.get(`${config.rootURL}user/${username}`)
      .then(response => {
        dispatch(setUser(response.data))
      })
  }
}

// SET_USERS ALL
export const setUsers = (users) => ({
  type: 'SET_USERS',
  payload: users
})

export const startSetUsers = () => {
  return (dispatch) => {
    axios.get(`${config.rootURL}users`)
      .then(response => {
        dispatch(setUsers(response.data))
      })
  }
}
