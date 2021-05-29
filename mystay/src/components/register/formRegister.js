import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {RMSInput} from '../shared/form/RMSInput';
import {RMSResError} from '../shared/form/RMSResError';
console.log({connect});

const FormRegister = props => {
    const { handleSubmit, pristine, submitting, submitcb, valid, errors} = props;
    console.log(props);
    console.log({handleSubmit, pristine, submitting, submitcb, valid, errors});

    return (
        <form onSubmit = {handleSubmit(submitcb)}>
        <Field
        name = "booking_id"
        type = "text"
        label = 'Booking ID'
        component = {RMSInput}
        className = "form-control"/>

        <Field
        name = "full_name"
        type = "text"
        label = 'Name'
        className = 'form-control'
        component = {RMSInput}/>

<Field
                name="password"
                
                type="password"
                label='Password'
                className="form-control"
                component={RMSInput}
            />
                <Field
                name="passwordConfirmation"
                
                type="password"
                label='Confirm Password'
                className="form-control"
                component={RMSInput}
            />
            <button className = 'btn btn-bwm btn-form' type = 'submit' disable = {true}{...!valid || pristine || submitting}>Register as Guest</button>
<RMSResError errors = {errors}/>
        </form>
    
    )
}
const validate = values => {
    const errors = {}
    if (values.booking_id && values.booking_id.length < 8) {
        errors.booking_id = 'Booking id is not minimum length of 8 characters!';
    }
    if(!values.full_name){
        errors.full_name = "Please enter your full name";
        console.log(values.full_name);
    }
    if (!values.passwordConfirmation){
        errors.passwordConfirmation = "Please enter password to confirm match";
        console.log(values.passwordConfirmation);
    }
    
    if (values.password !== values.passwordConfirmation){
        errors.password = 'Passwords must match';
        console.log(values.password);
    }
    return errors
}
export default connect() (reduxForm({ 
    form: 'formRegister', validate
})(FormRegister));
