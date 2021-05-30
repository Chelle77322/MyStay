import  'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';

import configureStore from './store/configStore';

import {loginSuccess} from './actions';

const target = document.getElementById('nav');
const store = configureStore(window._INITIAL_STATE);
const node = (
    <Root store = {store}/>
);
let token = localStorage.getItem('token');
if (token !== null){
    store.dispatch(loginSuccess(token));
}
ReactDOM.render(node, target);