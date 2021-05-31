
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import './index.css';
import App from './App';
import Root from './containers/Root';
import reportWebVitals from './reportWebVitals';

import app from 'express';
import config from './webpack.config';
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler))
app.use(bodyParser.json());

app.post('/auth/getToken/', (request, result) => {
  if(request.body.booking_id === '000ABC14' && request.body.password === 'password1234'){
    result.status(200).json({token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9'});
  } else {
    result.sendStatus(403);
  }
});
app.get('/getData/', (request, result)=>{
  let token = request.headers['authorization'];
  if (!token) {
    result.sendStatus(401);
  } else{
    try{
      let decoded = jwt.verify(token.replace('Bearer', ''), 'secret-key');
      result.status(200).json({data: 'Valid json webtoken found! This data is protected '});
    } catch (error) {
      result.sendStatus(401);
    }
  }
})
app.get('/', (request, result)=> {
  result.sendFile(__dirname + '/index.html');
});


ReactDOM.render(
  <React.StrictMode>
    <Root />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
