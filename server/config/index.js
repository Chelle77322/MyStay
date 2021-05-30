
import path from 'path';
import {argv} from 'yargs';
import dotenv from 'dotenv';

dotenv.use();
const config = new Map();
config.set('dir_src', 'src');
config.set('dir_build', 'build');

config.set('webpack_host', 'localhost');
config.set('webpack_port', 3000); //eslint-disable-line

config.set('vendor_dependencies', [
    'history',
    'react',
    'react-redux',
    'react-router',
    'redux',
    'redux-router'
]);






if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod.js');
} 