var redis = require('redis');
var config = require('../config');
var _ = require('lodash');

function createClient(options){

  var cli = redis.createClient(config.redis.port, config.redis.host, options);

  cli.auth(config.redis.password, function(err){
    if(err){
      throw err;
    }
  });

  return cli;
}

var client = createClient();

client = _.bindAll(client);

module.exports = {
  hgetall: client.hgetall,
  del: client.del,
  keys: client.keys
};
