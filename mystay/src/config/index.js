import path from 'path';
import {argv} from 'yargs';
import dotenv from 'dotenv';


const config = new Map();
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
config.set('env',process.env.NODE_ENV );
config.set('globals', {
    'process.env' : {
        'NODE_ENV': JSON.stringify(config.get('env'))
    },
    'NODE_ENV' : config.get('env'),
    '__DEV__' : config.get('env') === 'development',
    '__PROD__' : config.get('env') === 'production',
    '__DEBUG__' : config.get('env') === 'development' && !argv.no_debug,
    '__DEBUG_NW__' : !!argv.nw
});
//Webpack
config.set('webpack_public_path',
`http://${config.get('webpack_host')}:${config.get('webpack_port')}/`);


config.set('path_project', path.resolve(__dirname, '../'));

//
const paths = (() => {
    const base = [config.get('path_project')];
    const resolve = path.resolve;
    const project = (...args) => resolve.apply(resolve, [...base, ...args]);
    
    return {
        project: project,
       
        build: project.bind(null, config.get('dir_build'))
    };
}) ();
config.set('utils_path', paths);
config.set('utils_aliases', [
    'actions',
    'components',
    'constants',
    'containers',
    'reducers',
    'routes',
    'services',
    'utils',
].reduce((acc,dir)=> ((acc[dir]= paths.build(dir))&& acc), {}));
export default config