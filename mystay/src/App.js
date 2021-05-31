import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Header from './containers/header';
import Register from './components/register/Register';
import {ProtectedRoute} from './components/shared/auth/protected';
import {LoggedInRoute} from './components/shared/auth/loginroute';

import FeedbackForm from './components/feedback/feedbackForm';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';
const store = require('./reducers').init();

 class App extends Component { 
 
    render() {
        return (
        <Provider store = {store}>
          
            <BrowserRouter>
            <div className = "App">
                <Header logout={this.logout}/>

                <div className = 'container'>
                <Switch>

                <Route exact path = "/" render={() => <Redirect to="/feedback" />} />  
                 <ProtectedRoute exact path = "/feedback" component = {FeedbackForm}/>

            <LoggedInRoute exact path="/register" component={Register}/>
            </Switch>
                </div>
            </div>
            </BrowserRouter>
        </Provider>
        );
    }
}

export default App;
