import axios from 'axios'
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    FETCH_ACCOMMODATION_BY_ID_SUCCESS,
    FETCH_ACCOMMODATION_BY_ID_INIT,
    FETCH_ACCOMMODATION_INIT,
    FETCH_ACCOMMODATION_SUCCESS,
    FETCH_ACCOMMODATION_FAIL,
    FETCH_FEEDBACK_FAIL,
    FETCH_FEEDBACK_INIT,
    FETCH_FEEDBACK_SUCCESS,
    FETCH_USERFEEDBACK_FAIL,
    FETCH_USERFEEDBACK_INIT,
    FETCH_USERFEEDBACK_SUCCESS
   } from './types'

//Accommodation Actions
const axiosInstance = axiosService.getInstance();


const fetchAccommodationByIdInit = () => {
    return {
        type: FETCH_ACCOMMODATION_BY_ID_INIT
    }
}
const fetchAccommodationByIdSuccess = (accommodation) => {
    return {
        type: FETCH_ACCOMMODATION_BY_ID_SUCCESS, accommodation
    }
}
const fetchAccommodationSuccess = (accommodation) => {
    return {
        type: FETCH_ACCOMMODATION_SUCCESS, accommodation
    }
}
const fetchAccommodationInit = () => {
    return {
        type: FETCH_ACCOMMODATION_INIT
    }
}
const fetchAccommodationFail = (errors) => {
    return {
        type: FETCH_ACCOMMODATION_FAIL, errors
    }
}

//Feedback Actions
const fetchFeedbackInit = () => {
    return {
        type: FETCH_FEEDBACK_INIT
    }
}
const fetchFeedbackSuccess = () => {
    return {
        type: FETCH_FEEDBACK_SUCCESS
    }
}
const fetchFeedbackFail = (errors) => {
    return {
        type: FETCH_FEEDBACK_FAIL, errors
    }
}

 export const fetchFeedback = (accommodation) => {
     const url = accommodation ?`/feedback?place=${accommodation}`: '/feedback';
     return dispatch => {
         dispatch(fetchFeedbackInit());
         axiosInstance.get(url).then((result)=> {
             return result.data
         }).then(feedback =>{
             dispatch(fetchFeedbackSuccess(feedback));
         }).catch(({response}) =>{
             dispatch(fetchFeedbackFail(response.data.errors))
         });
     }
 }
 export const createFeedback = (feedbackData) => {
     return axiosInstance.post('/feedback', {...feedbackData}).then((result) => {
         return result.data;
     }, (error)=> {
         return Promise.reject(error.response.data.errors);
     })
 }
 export const fetchAccommodation = (accommodation) =>{
 return function(dispatch)
 { dispatch(fetchAccommodationSuccess());
    axios.get(`/api/accommodation/${accommodation}`).then((result)=>{
        return result.data
    }).then(accommodation => {
        dispatch(fetchAccommodationByIdSuccess(accommodation));
    }).catch(({response})=>
    {
        dispatch(fetchAccommodationFail(response.data.errors))
    });
}
 }
 //User Actions
 const fetchUserFeedbackSuccess = (feedback) => {
    return {
        type: FETCH_USERFEEDBACK_SUCCESS, feedback
    }
}
const fetchUserFeedBackInit = () => {
    return {
        type: FETCH_USERFEEDBACK_INIT
    }
}
const fetchUserFeedbackFail = (errors) => {
    return {
        type: FETCH_USERFEEDBACK_FAIL, errors
    }
}
export const fetchUserFeedback = () => {
    return dispatch => {
        dispatch(fetchUserFeedBackInit());
        axiosInstance.get('/feedback/manage').then((result)=>{
            return result.data
        }).then(userFeedback => {
            dispatch(fetchUserFeedbackSuccess(userFeedback));
        }).catch(({response})=> {
            dispatch(fetchUserFeedbackFail(response.data.errors))
        });
    }
}
//AUTHORIZATION ACTIONS HERE (LOGIN)
export const Register = (userData) => {
    return axios.post('api/users/register', {...userData}).then ((result)=> {
        return result.data;
    }, (error)=>{
        return Promise.reject(error.response.data.errors);
    })
}
const loginSuccess = () => {
    const booking_id = authService.getBooking_ID();
    return {
        type: LOGIN_SUCCESS,booking_id
        
    }
}
const loginFail = (errors) => {
   
    return {
        type: LOGIN_FAIL, errors
        
    }
}
export const checkAuthState = () => {
    return dispatch => {
        if(authService.isAuthenticated()){
            dispatch(loginSuccess());
        }
    }
}
export const loginUser = (userData) => {
    return dispatch => {
        return axios.post('/api/users/auth',userData).then (token => {
            authService.saveToken(token);
            dispatch(loginSuccess());
        }).catch(({response})=>{
            dispatch(loginFail(response.data.errors));
        })
    }
}
export const logout = () => {
    authService.inValidateUser();
    console.log(authService.inValidateUser());
    return {
        type: LOGOUT
    }
}
export const createUserFeedback = (feedback) => {
    return axiosInstance.post('/feedback', feedback).then(result => result.data).catch(({response})=> Promise.reject(response.data.errors));
}