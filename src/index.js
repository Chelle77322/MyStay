import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import serviceworker from './serviceworker';
import 'bootstrap/dist/js/bootstrap.min.js';


ReactDOM.render(
    <App />, document.getElementById('root'));
    serviceworker();
