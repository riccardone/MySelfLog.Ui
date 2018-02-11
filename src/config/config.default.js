var config = module.exports = {};

config.env = 'dev';

config.path = '/api/v1/logs';

config.apiLink = 'http://myselflog-api:5001';

// config.callbackUrl = "http://localhost:3000/callback";
config.callbackUrl = "http://preview.myselflog.com/callback";

// logging
config.logAppender = "debug";
config.logLevel = "debug";