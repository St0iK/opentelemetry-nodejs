const Redis = require('ioredis');
//TODO: read from process.ENV

console.log('======================');
console.log('🚀 CONNECTING TO REDIS');
console.log('======================');
const redisClient = new Redis('redis://redis:6379');

let redisAvailable;

redisClient.on("error", (error) => {
  console.error(error);
  redisAvailable = false
});

redisClient.on("end", (error) => {
  console.error(error);
  redisAvailable = false
});

redisClient.on("connect", () => {
  redisAvailable = true
});

export default (ttl) => async (ctx, next) => {

  if (!redisAvailable) {
    ctx.response.set('opentelemetry-nodejs-cache-online', 'false');
    await next();
    return;
  }

  ctx.response.set('opentelemetry-nodejs-cache-online', 'true');

  const { url } = ctx.request;
  const key = `otpl-${url}`;
  console.log({key})


  if (ttl) {
    ctx.response.set('Cache-Control', `max-age=${ttl}`);
  } else {
    ctx.response.set('Cache-Control', 'no-store');
  }

  // Only allow cache on whitelist methods
  if (!['GET', 'POST'].includes(ctx.request.method)) {
    await next();
    return;
  }

  let cached;
  try {
    cached = await redisClient.get(key);

    if (cached) {
      ctx.response.status = 200;
      ctx.response.set('opentelemetry-nodejs-cache', 'HIT');
      ctx.response.type = 'application/json';
      ctx.response.body = cached;
      cached = true;
    }
  } catch (e) {
    cached = false;
  }
  if (cached) {
    console.log('found in cache - go away')
    return;
  }
  await next();

  const responseBody = JSON.stringify(ctx.response.body);
  console.log({responseBody});
  ctx.response.set('opentelemetry-nodejs-cache', 'MISS');

  // Set cache
  try {
    if ((ctx.response.status !== 200) || !responseBody) {
      return;
    }
    await redisClient.set(key, responseBody, 'EX', ttl);
  } catch (e) {
    console.log(`Failed to set cache: ${e.message}`);
  }

  console.log({ttl})
  console.log({ctx})
  console.log({next})
}