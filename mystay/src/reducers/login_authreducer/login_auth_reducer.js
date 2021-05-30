import {createReducer} from '../utils';
import REGISTER from './../../constants';
import LOGIN_SUCCESS from './../../constants';
import LOGIN_FAIL from './../../constants';
import LOGOUT from './../../constants';
import {pushState} from 'redux-router';
import jwtDecode from 'jwt-decode';


const initialState = {
    token: null,
    booking_id: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default createReducer(initialState, {
    [REGISTER]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        });
    },
    [LOGIN_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'token': payload.token,
            'booking_id': jwtDecode(payload.token).booking_id,
            'statusText': 'You have been logged in'
        });
    },
    [LOGIN_FAIL]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'token': null,
            'booking_id': null,
            'statusText': `Authentication Error : ${payload.status} ${payload.statusText}`
        });
    },
    [LOGOUT]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'token': null,
            'booking_id': null,
            'statusText': 'You have been logged out  🏘 '
        });
    }
});