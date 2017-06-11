const uuid = require('uuid')

module.exports = function (connection, mongoose, globalModelContainer) {
  let CachedDataSchema = new mongoose.Schema( {
    key: { type: String, required: true, unique: true },
    data: { type: String, required: true, default: uuid.v4() }
  })

  globalModelContainer.CachedData = connection.model('CachedData', CachedDataSchema)
}
