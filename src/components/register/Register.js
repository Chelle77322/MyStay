import React from 'react';
import FormRegister from './formRegister';
import * as actions from '../../actions';
import {Redirect} from 'react-router-dom';

export class Register extends React.Component{
    constructor () {
        super();
        this.state = {
            errors:[],
            redirect: false
        }
        this.registerUser = this.RegisterUser.bind(this);
    }
    RegisterUser(userData){
        actions.Register(userData).then((_Registered) => {
            this.setState({redirect:true});
        }, (errors)=> {
            this.setState({errors});
        });
    }
    render(){
        const{errors, redirect} = this.state;
        if(redirect){
            return <Redirect to ={{pathname: '/login', state:{successRegistered: true}}}/>
            
        }
        return (
            <section id = 'register'>
                <div className = 'bwm-form'>
                    <div className = 'row'>
                        <div className = 'col-md-5'>
                            <h1> Register</h1>
                            <FormRegister submitcb = {this.registerUser} errors = {errors}/>
                        </div>
                        <div className = 'col-md-6 ml-auto'>
                            <div className = 'image-container'>
                                <h2 className = 'catchphrase'> Leave your feedback about your stay</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
