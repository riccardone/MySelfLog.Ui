var config = require('./config.default');

config.env = 'production';
config.host = 'localhost';
config.port = 3001;

config.eventstoreConnection = 'http://infrastructure.myselflog.com:2113';
config.publishTo = "diary-input";
config.callbackUrl = "http://preview.myselflog.com/callback";

// logging
config.logAppender = "error";
config.logLevel = "error";

module.exports = config;