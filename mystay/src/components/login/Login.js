import React from 'react';
import LoginForm from './LoginForm';
import {connect } from 'react-redux';
import * as actions from '../../actions';
import {Redirect} from 'react-router-dom';

export class Login extends React.Component{
    constructor(){
        super();
        this.state = {
        errors:[],
        redirect: false
        }
        this.loginUser = this.loginUser.bind(this);
        console.log(this.loginUser);
        
    }
    loginUser(userData){
        this.props.dispatch(actions.loginUser(userData));
    }
    render() {
    //Issue is here on line 22
       const {isAuth, errors} = this.props.auth;
       const{successRegistered} = this.props.location.state || false;
        
        if(isAuth){
           
            
            return <Redirect to = {{pathname: '/feedback'}} />
        }
     return (
        <section id = "login">
                <div className = "bwm-form">
                    <div className = "row">
                        <div className = "col-md-5">
                            <h1>Guest Login</h1>
                    {successRegistered && 
                    <div className = "alert alert-success"><p>You have been successfully registered as a current guest. Please login now
               </p></div>}
                              
                <LoginForm submitcb = {this.loginUser} errors = {errors}/>
                        </div>
                        <div className = "col-md-6 ml-auto">
                            <div className = "image-container">
                                <h2 className = "catchphrase"> Select an area to give feedback</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
function mapStatetoProps(state){
    return {
        auth: state.auth
       
    }
   
}
export default connect(mapStatetoProps)(Login);
console.log(Login);