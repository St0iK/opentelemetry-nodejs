import KoaRouter from 'koa-router';

import helloMiddleware from './middleware/hello';
import photoMiddleware from './middleware/photo';
import weatherMiddleware from './middleware/weather';

const router = new KoaRouter();

router.get('/', helloMiddleware);
router.get('/photo', photoMiddleware);
router.get('/weather', weatherMiddleware);



export default router;
