const redis = require('redis');
const redisClient = redis.createClient({
  url: 'redis://default:2018114383!!@3.37.225.217:6379'
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


