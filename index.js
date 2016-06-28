var _ = require('lodash');
var channels = require('./lib/database').logChannels;
var redis = require('./lib/redis');
var schedule = require('node-schedule');

var date = new Date()
date.setDate(date.getDate() - 1);
var lastDay = date;

var keyPrefix = "cnt:" + lastDay.getDate() + ":";

var _redis2Mongo = function(key){
  var channelUuid = _.trimLeft(key, keyPrefix);
  redis.hgetall(key, function(error, log){
    
    log.uuid = channelUuid;
    log.timestamp = lastDay;
    console.log(log);
    channels.insert(log,function(error){
      if(error){
        return
      }
      redis.del(key);
    });
    
  })
}

var moveCnt = function () {

  console.log('start');

  redis.keys(keyPrefix + "*", function(error, keyArray){
    _.forEach(keyArray, _redis2Mongo );
  });

};

var j = schedule.scheduleJob('0 18 1 * * *', moveCnt);