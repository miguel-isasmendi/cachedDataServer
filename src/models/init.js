const path = require('path')
const logger = require('log4js').getLogger('Models Initializator')

function createModels (connection, mongoose, normalizedPath, globalModelContainer) {
  logger.debug(`Creating Models...`)

  require(path.join(normalizedPath, 'CachedData'))(connection, mongoose, globalModelContainer)
  logger.debug(`Models created so far: ${JSON.stringify(Object.keys(globalModelContainer))}`)
}

module.exports = createModels
