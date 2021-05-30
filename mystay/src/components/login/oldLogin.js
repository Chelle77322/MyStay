import React from 'react';
import{Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Login,Field, reduxForm} from 'redux-form';
import{logoutAndRedirect} from '../..loginAuth';

import '../../styles/main.scss';

connect =((state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
})

class Login extends Component{

render() {
    const {dispatch} = this.props;
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
    

<div className = 'container'>
    <div className = 'row'>
        {this.props.children}
    </div>
</div>
</form>
    );
}
}
export default reduxForm({ 
    form: 'Login'
})(Login);