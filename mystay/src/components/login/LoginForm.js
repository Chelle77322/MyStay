import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import{RMSInput} from '../shared/form/RMSInput';
import{RMSResError} from '../shared/form/RMSResError';
import { required, minLength8} from '../shared/form/validator';

const LoginForm = props => {
    const { handleSubmit, pristine, submitting, submitcb, valid, errors} = props
    return (
        <form onSubmit = {handleSubmit(submitcb)}>
        <Field
        name = "booking_id"
        type = "text"
        label = "Booking Id"
        className = "form-control"
        component = {RMSInput}
        validate = {[required, minLength8]}/>

        <Field
        name = "password"
        type = "password"
        label = 'Password'
        className = "form-control"
        component = {RMSInput}
        validate = {[required]}/>

        <button className = "btn btn-bwm btn-form" type = "submit" disabled = {!valid || pristine || submitting}>Guest Login</button>
        <RMSResError errors = {errors}/>
        </form>
    )
}
export default connect() (reduxForm ({
    form: 'LoginForm'
})(LoginForm));