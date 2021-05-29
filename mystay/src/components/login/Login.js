import React, {Component} from 'react';
import { Field , reduxForm} from 'redux-form';
import{RMSInput} from '../shared/form/RMSInput';



 export class Login extends Component{
state = {booking_id: this.props.booking_id, password: this.props.password};
handleChange = event => {
    this.setState({booking_id: event.target.value, password: event.target.value});
}
render() {
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
    name = "password"
    type = "password"
    label = 'Password'
    component = {RMSInput}
    className = "form-control"
    value = {this.state.password}/>

    <button className = 'btn btn-bwm btn-form'
    type = 'submit'>Guest Login</button>
    
</form>
    )
}
}
export default reduxForm({ 
    form: 'Login'
})(Login);