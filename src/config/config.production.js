var config = require('./config.default');

config.env = 'production';

config.apiLink = 'http://preview.myselflog.com:5001';
config.path = '/api/v1/logs';
config.callbackUrl = "http://preview.myselflog.com/callback";

module.exports = config;