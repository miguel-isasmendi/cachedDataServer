module.exports = {
  port: process.env.PORT || 8087,
  mongoConfig: {
    'host' : 'mongoDB:27017',
    'dbName' : 'LongTermModel',
    'modelsFolderName' : 'models'
  }
}
