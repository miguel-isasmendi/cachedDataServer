const logger = require('log4js').getLogger('Cached Data DAO')

class CachedDataDAO {
  constructor(dbConnectorData) {
    this.dbConnectorData = dbConnectorData
    this.CachedData = this.dbConnectorData.models['CachedData']
  }

  removeCachedData(cacheKey, callback) {
    this.CachedData.findOneAndRemove({'key': cacheKey}, callback)
  }

  updateCachedData(cacheKey, callback) {
    new this.CachedData({key: cacheKey})
      .save(
        (error, savedData) => {
          callback(error, savedData, true)
        }
      )
  }

  getCachedData(cacheKey, callback) {
    this.CachedData.findOne(
      {'key': cacheKey},
      (err, data) => {
        if (!data) {
          logger.debug('Cache miss!')

          this.updateCachedData(cacheKey, callback)
        } else {
          logger.debug('Cache hit!')

          callback(err, data, false)
        }        
      }
    )
  }

  getAllCachedData(callback) {
    this.CachedData.find({}, callback)
  }

  removeAllCachedData(callback) {
    this.CachedData.remove({}, callback)
  }
}

module.exports = dbConnectorData => {
  logger.debug(`Exporting Cached Data DAO`)
  return new CachedDataDAO(dbConnectorData)
}
