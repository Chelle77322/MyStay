require('babel-core');
const config = require('../../server/config');
module.exports = require('./build/webpack/' + config.get('env'));