/**
 * Created by lvjianyao on 16/6/27.
 */
var config = require('./../config');

var mongojs = require('mongojs');
var db = mongojs(config.mongo.databaseUrl);

var getCollection = function (channelUuid){
  return db.collection(channelUuid);
}

module.exports = {
  logChannels: getCollection('logChannels')
};

db.on('error', function (err) {
  if (/ECONNREFUSED/.test(err.message) ||
    /no primary server available/.test(err.message)) {
    console.error('FATAL: database error', err);
    process.exit(1);
  }
})