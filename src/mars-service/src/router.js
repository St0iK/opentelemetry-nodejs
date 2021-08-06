import KoaRouter from 'koa-router';

import helloMiddleware from './middleware/hello';

const router = new KoaRouter();

router.get('/', helloMiddleware);

export default router;
