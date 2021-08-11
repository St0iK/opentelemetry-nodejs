import KoaRouter from 'koa-router';

import helloMiddleware from './middleware/hello';
import latestPhotosMiddleware from './middleware/photo';
import weatherMiddleware from './middleware/weather';

const router = new KoaRouter();

router.get('/', helloMiddleware);
router.get('/latest_photos', latestPhotosMiddleware);
router.get('/weather', weatherMiddleware);



export default router;
