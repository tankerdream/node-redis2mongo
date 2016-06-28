/**
 * Created by lvjianyao on 16/6/27.
 */
module.exports = {
  mongo: {
    databaseUrl: process.env.MONGODB_URI
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD
  }
};
