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
import ResendTokenSuccess from '../components/auth/resendTokenSuccess';
import NotFoundPage from '../components/NotFoundPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Secret from '../components/Secret';
import CreateNewArticle from '../components/article/CreateNewArticle';
import SingleArticle from '../components/article/SingleArticle';
import EditArticle from '../components/article/EditArticle';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Profile from '../components/userProfile/Profile';
import Profiles from '../components/userProfile/Profiles';
import WizardForm from '../components/auth/RegisterWizard/WizardForm';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
        <Header />
        <Switch>
        <Route exact path='/' component={DashboardPage}/>
        <PublicRoute exact path='/login' component={Login}/>
        <PublicRoute exact path='/logout' component={Logout}/>
        <PublicRoute exact path='/register' component={Register}/>
        <PublicRoute exact path='/wizard' component={WizardForm}/>
        <PublicRoute exact path='/register/success' component={RegisterSuccess}/>
        <PublicRoute exact path='/auth/verify/:token' component={Verify}/>
        <PublicRoute exact path='/auth/resend' component={ResendToken}/>
        <PublicRoute exact path='/auth/resend/success' component={ResendTokenSuccess}/>
        <PublicRoute exact path="/article/:id" component={SingleArticle} />
        <PublicRoute exact path="/article/:id/edit" component={EditArticle} />

        <PrivateRoute exact path='/secret' component={Secret}/>
        <PrivateRoute exact path='/user/:id' component={Profile}/>
        <PrivateRoute exact path='/users' component={Profiles}/>
        <PrivateRoute exact path='/user/:*' component={NotFoundPage}/>
        <PrivateRoute exact path='/create' component={CreateNewArticle}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;
