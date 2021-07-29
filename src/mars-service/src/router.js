import KoaRouter from 'koa-router';

import helloMiddleware from './middleware/hello';
import downstreamMiddleware from './middleware/downstream';

const router = new KoaRouter();

router.get('/', helloMiddleware);
router.get('/downstream', downstreamMiddleware(process.env.DOWNSTREAM_API));

export default router;
