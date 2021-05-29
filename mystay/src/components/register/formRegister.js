import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {RMSInput} from '../shared/form/RMSInput';
import {RMSResError} from '../shared/form/RMSResError';


const FormRegister = props => {
    const { handleSubmit, pristine, submitting, submitcb, valid, errors} = props;
  

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
            <button className = 'btn btn-bwm btn-form' type = 'submit' disabled = {!valid || pristine || submitting}>Register as Guest</button>
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
        
    }
    if (!values.passwordConfirmation){
        errors.passwordConfirmation = "Please enter password to confirm match";
       
    }
    
    if (values.password !== values.passwordConfirmation){
        errors.password = 'Passwords must match';
    
    }
    return errors
}
export default reduxForm({ 
    form: 'formRegister', validate
})(FormRegister);
