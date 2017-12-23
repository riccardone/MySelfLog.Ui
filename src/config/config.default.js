var config = module.exports = {};

config.env = 'dev';
config.host = 'localhost';
config.port = 3001;

config.eventstoreConnection = 'http://localhost:2113';
config.publishTo = "diary-input";
config.callbackUrl = "http://localhost:3000/callback";

// logging
config.logAppender = "debug";
config.logLevel = "debug";