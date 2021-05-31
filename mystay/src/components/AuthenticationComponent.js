/* eslint-disable react/prop-types */

import React from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';

export default function requireAuthentication(Component){
    class AuthenticatedComponent extends React.Component {
        componentDidMount (){
            this.checkAuth(this.props.isAuthenticated);
        }
        componentDidUpdate(nextProps){
            this.checkAuth(nextProps.isAuthenticated);
        }
    checkAuth (isAuthenticated){
        if(!isAuthenticated){
            let redirectAfterLogin = this.props.location.pathname;
            this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
        }
    }
    render () {
        return (
            <div>
                {this.props.isAuthenticated === true?
                <Component {...this.props}/>
            :null
            }
            </div>
        )
    }
    }
    const mapStateToProps = (state)=> ({
        token: state.auth.token,
        userName : state.auth.booking_id,
        isAuthenticated: state.auth.isAuthenticated
    });
    return connect(mapStateToProps)
    (AuthenticatedComponent);

}