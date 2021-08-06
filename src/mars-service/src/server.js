import getenv from 'getenv';
import Koa from 'koa';
import router from './router';

console.log(__filename);
export function initialise() {
  const PORT = getenv.int('HTTP_PORT', 80);
  console.log({ PORT })
  const app = new Koa();

  app.use(router.routes());

  app.listen(PORT);
}
