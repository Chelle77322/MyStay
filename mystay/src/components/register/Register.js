import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {RMSInput} from '../shared/form/RMSInput';


export class Register extends Component {
    state = {
        booking_id: this.props.booking_id, 
        full_name: this.props.full_name,
        password: this.props.password,
        passwordConfirmation: this.props.password
        };
    handleChange = event =>{
        this.setState({
            booking_id: event.target.value,
            full_name: event.target.value,
            password: event.target.value,
            passwordConfirmation: event.target.value
        });
    }
render(){
    return (
        <form onSubmit>
        <Field
        name = "booking_id"
        type = "text"
        label = 'Booking ID'
        component = {RMSInput}
        className = "form-control"
        value = {this.state.booking_id}/>

        <Field
        name = "full_name"
        type = "text"
        label = 'Name'
        className = 'form-control'
        component = {RMSInput}
        value = {this.state.full_name}/>

        <Field
        name="password"
        type="password"
        label='Password'
        className="form-control"
        component={RMSInput}
        value = {this.state.password}/>
                
        <Field
        name="passwordConfirmation"
        type="password"
        label='Confirm Password'
        className="form-control"
        component={RMSInput}
        value = {this.state.passwordConfirmation}/>
            
        <button className = 'btn btn-bwm btn-form' type = 'submit'>Register as Guest</button>

</form>
    
    )
}
}
export default reduxForm ({
    form: 'Register'
})(Register);