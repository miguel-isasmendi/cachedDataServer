let config = require('./config.prod')

config.port = 8080
config.mongoConfig.host = 'localhost:27017'

module.exports = config
