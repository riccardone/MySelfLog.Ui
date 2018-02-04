var config = module.exports = {};

config.env = 'dev';

config.apiLink = 'http://myselflog-api:5001';
config.path = '/api/v1/logs';
config.callbackUrl = "http://preview.myselflog.com/callback";

// logging
config.logAppender = "debug";
config.logLevel = "debug";