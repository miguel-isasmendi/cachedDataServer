const express = require('express')
const server = express()
const processModule = require('process')
const logger = require('log4js').getLogger('Main App')

let programArgs = require('commander')

programArgs
  .version('0.0.1')
  .option('-e, --environment [String]', 'Environment option ["dev", "prod"]("prod" is the default and fallback configuration)')
  .parse(processModule.argv)

let configFileName = ''

switch (programArgs.environment) {
  case 'dev':
    configFileName = 'dev'
    logger.info('Building development config...')
    break;
  default:
    configFileName = 'prod'
    logger.info('Building production config...')
}

const config = require(`./config/config.${configFileName}`)

logger.info('Configuration read:')
logger.info(JSON.stringify(config))

logger.info('Starting App...')

require('./src/dao/init')(
  config.mongoConfig,
  server,
  (err, dao) => {
    if (!err) {
      require('./src/resources/init')(config, server, dao)
    }
  })

server.listen(
  config.port,
  () => {
    logger.info(`Listening with PID ${processModule.pid} on port ${config.port}`)
    logger.info(`This platform is ${processModule.platform}`)
  }
)
