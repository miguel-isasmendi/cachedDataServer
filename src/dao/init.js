const logger = require('log4js').getLogger('DAO Initializator')

module.exports = (aConfig, server, callback) => {
  logger.debug(`Delegating DAOs creation`)

  require('../store/mongoDBConnector')(aConfig, require('../models/init'), require('./CachedDataDAO'), callback)

  logger.debug(`Done creating DAOs`)
}
