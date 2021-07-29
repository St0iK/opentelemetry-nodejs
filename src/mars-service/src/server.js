import getenv from 'getenv';
import Koa from 'koa';

import errorMiddleware from './middleware/error';
import router from './router';

export function initialise() {
  const PORT = getenv.int('HTTP_PORT', 80);

  const app = new Koa();

  app.use(errorMiddleware);
  app.use(router.routes());

  app.listen(PORT);
}
