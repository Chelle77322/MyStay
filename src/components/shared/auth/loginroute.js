import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import AuthService from '../../../services/auth-service';

export function LoggedInRoute(props){
    const {component: Component, ...rest} = props;
    return (
        <Route {...rest} render = {(props) => AuthService.isAuthenticated()?
        <Redirect to = {{pathname: '/feedback'}}/>: 
    <Component{...props}{...rest}/>}/>
    )
}