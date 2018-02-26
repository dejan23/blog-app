import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout';
import Register from '../components/auth/Register';
import RegisterSuccess from '../components/auth/RegisterSuccess';
import Verify from '../components/auth/Verify';
import ResendToken from '../components/auth/ResendToken';
import ResendTokenSuccess from '../components/auth/ResendTokenSuccess';
import NotFoundPage from '../components/NotFoundPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Feature from '../components/Feature';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute exact path='/' component={DashboardPage}/>
        <PublicRoute exact path='/login' component={Login}/>
        <PublicRoute exact path='/logout' component={Logout}/>
        <PublicRoute exact path='/register' component={Register}/>
        <PublicRoute exact path='/register/success' component={RegisterSuccess}/>
        <PublicRoute exact path='/auth/verify/:token' component={Verify}/>
        <PublicRoute exact path='/auth/resend' component={ResendToken}/>
        <PublicRoute exact path='/auth/resend/success' component={ResendTokenSuccess}/>

        <PrivateRoute exact path='/feature' component={Feature}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
