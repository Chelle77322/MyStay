/* eslint-disable react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import {logoutAndRedirect} from '../actions/loginAuth';

import './../styles/main.scss';

// eslint-disable-next-line no-unused-vars
connect= ((state)=> {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
})
export default class Header extends React.Component {
    render(){
        const {dispatch} = this.props;
        return (
            <div>
                <nav className = "navbar navbar-default">
                    <div className = "container">
                        <div className = "navbar-header">
                            <Link className = "navbar-brand" to ="/login">Guest Login</Link>
                        </div>
                        <div>
                        <Link className = 'nav-item nav-link' to ='/register'> Register as Guest</Link>
                        </div>
                        <div id = "navbar">
                            <ul className = "nav navbar-nav navbar-right">
                            <li><Link to = "/feedback">Feedback</Link></li>
                            <li><Link to = "/login">Guest Login</Link></li>
                            {this.props.isAuthenticated?<li><a href = '/'onClick={() => this.props.dispatch(logoutAndRedirect())}>Logout</a></li>: ''}
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-7'>
                            {this.props}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}