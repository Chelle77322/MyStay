import { checkHttpStatus, parseJSON} from '../utils';
import LOGIN_FAIL from './../constants/index';
import REGISTER from './../constants/index';
import LOGIN_SUCCESS from './../constants/index';
import LOGOUT from './../constants.index';
import FETCH_PROTECTED_DATA_REQUEST from './../constants/index';
import RECEIVE_PROTECTED_DATA from './../constants/index';
import {pushState} from 'redux-router';
import jwtDecode from 'jwt-decode';

export function loginUser(token){
    localStorage.setItem('token', token);
    return{
        type: LOGIN_SUCCESS,
        payload: {
            token: token
        }
    }
}
export function loginFail(error){
    localStorage.removeItem('token');
    return {
        type: LOGIN_FAIL,
        payload: {
            status: error.response.status,
            statusText: error.response.statusText
        }
    }
}
export function Register (){
    return{
        type: REGISTER
    }
}
export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT
    }
}

export function logoutRedirect(){
    return (dispatch, state) => {
        dispatch(pushState(null, '/login'));
    }
}
export function loggedUser(booking_id, password, redirect ="/"){
    return function (dispatch){
        dispatch(loginUser());
        return fetch('/user/auth/getToken/',{
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({booking_id: booking_id, password: password })
        }).then(checkHttpStatus).then(parseJSON).then(response => {
            try {
                let decoded = jwtDecode(response.token);
                dispatch(loginUser(response.token));
                dispatch(pushState(null,redirect));
            }
            catch (error){
                dispatch (loginFail({
                   response: {
                       status: 403,
                       statusText: 'Invalid token'
                   } 
                }));
            }
        }).catch(error => {
            dispatch(loginFail(error));
        })
    }
}
export function recieveProtectedData(data){
    return {
        type: RECEIVE_PROTECTED_DATA,
        payload: {
            data: data
        }
    }
}
export function fetchProtectedDataRequest() {
    return {
        type: FETCH_PROTECTED_DATA_REQUEST
    }
}
export function fetchProtectedData(token){
    return (dispatch, state) => {
        dispatch(fetchProtectedDataRequest());
        return fetch ('users/feedback', {
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(checkHttpStatus).then(parseJSON).then(response => {
            dispatch(recieveProtectedData(response.data));
        }).catch( error => {
            if(error.response.status === 401){
                dispatch(loginFail(error));
                dispatch(pushState(null, '/login'));
            }
        })
    }
}