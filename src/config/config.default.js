var config = module.exports = {};

config.env = 'dev';
config.host = 'localhost';
config.port = 3001;

config.eventstoreConnection = 'http://localhost:2113';
config.publishTo = "diary-input";

// logging
config.logAppender = "debug";
config.logLevel = "debug";