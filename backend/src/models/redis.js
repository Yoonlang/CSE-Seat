require('dotenv').config();
const redis = require('redis');
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

(async ()=>{
  await redisClient.connect();
})();

module.exports = {
  set : async (k,v)=>{
    try {
      await redisClient.set(k, v);
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  get : async (k)=>{
    try {
      const value = await redisClient.get(k);
      return value;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  select : async (num)=>{
    try {
      await redisClient.select(num);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getClient : ()=>{return redisClient}

}


