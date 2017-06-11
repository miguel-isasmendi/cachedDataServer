const logger = require('log4js').getLogger('Resources Initializator')
let dao = null

function getAllCachedData (req, res, next) {
  logger.debug(`Retrieving ALL cached data`)

  dao.getAllCachedData(
    (err, data) => {
      res
        .status(err ? 503 : 200)
        .send({data: data})
      next()
    }
  )
}

function deleteAllCachedData (req, res, next) {
  logger.debug(`Removing ALL cached data`)

  dao.removeAllCachedData(
    (err, data) => {
      res
        .status(err ? 503 : 204)
        .send({})
      next()
    }
  )
}

function getCachedData (req, res, next) {
  logger.debug(`Retrieving cached data with key: ${req.params.key}`)

  dao.getCachedData(
    req.params.key,
    (err, data, upserted) => {
      if (err) {
        res
          .status(503)
          .send({err: JSON.stringify(err)})
      } else {
        res
          .status(upserted ? 201 : 200)
          .send({data: data})
      }
      next()
    }
  )
}

function updateCachedData (req, res, next) {
  logger.debug(`Updating/Creating cached data with key: ${req.params.key}`)

  // validating request
  if (!req.params.key || !req.params.data) {
    res
      .status(400)
      .send({error: 'Bad arguments!!!'})

    return next()
  }

  dao.updateCachedData(
    req.params,
    (err, data) => {
      if (err) {
        res
          .status(503)
          .send({err: JSON.stringify(err)})
      } else {
        res
          .status(!data ? 400 : 201)
          .send({})
      }

      next()
    }
  )
}

function deleteCachedData (req, res, next) {
  logger.debug(`Removing cached data with key: ${req.params.key}`)

  dao.removeCachedData(
    req.params.key,
    (err, data) => {
      if (err) {
        res
          .status(503)
          .send({err: JSON.stringify(err)})
      } else {
        res
          .status(204)
          .send({})
      }

      next()
    }
  )
}
module.exports = (aConfig, aServer, aDAOobject) => {
  logger.debug('Adding handlers...')
  dao = aDAOobject

  aServer.get('/cache', getAllCachedData)
  aServer.delete('/cache', deleteAllCachedData)
  aServer.get('/cache/:key', getCachedData)
  aServer.post('/cache/:key', updateCachedData)
  aServer.delete('/cache/:key', deleteCachedData)

  logger.debug('Done adding handlers')
}
