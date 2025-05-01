import { RateLimiterRedis } from 'rate-limiter-flexible';
import redisClient from '../config/redis.js';

//Token that lasts 25m and has 50 api requests per user.
const tokenBucket = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'limitKeyPrefix',
  points: 100,
  duration: 15 * 60 * 1000 
});

export const tokenBucketMiddleware = (req, res, next) => {
  tokenBucket.consume(req.ip)
    .then(() => next())
    .catch(_ => {
      const retrySecs = Math.round(tokenBucket.msBeforeNext / 1000) || 1;
      res.set('Retry-After', String(retrySecs));
      res.status(429).json({ error: 'Too Many Requests' });
    });
}
export default tokenBucketMiddleware;