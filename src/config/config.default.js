var config = module.exports = {};

config.env = 'dev';
config.host = 'localhost';
config.port = 3001;

config.apiLink = 'http://localhost:3001';
config.path = '/api/v1/logs';
config.callbackUrl = "http://localhost:3000/callback";

// logging
config.logAppender = "debug";
config.logLevel = "debug";