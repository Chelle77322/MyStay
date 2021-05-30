import React from 'react';
import Route from '../routes';
import IndexRoute from '../routes';
import Header from './../containers/header';
import HomeView from '../views';
import LoginView from '../views';
import ProtectedView from '../views';

import requireAuthentication from '../components/AuthenticationComponent';

export default(
    <Route path = '/' component = {Header}>
        <IndexRoute component = {HomeView}/>
        <Route path = "login" component = {LoginView}/>
        <Route path = "protected" component = {requireAuthentication(ProtectedView)}/>
    </Route>
);