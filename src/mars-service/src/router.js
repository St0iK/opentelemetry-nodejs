import KoaRouter from 'koa-router';
import helloMiddleware from './middleware/hello';
import latestPhotosMiddleware from './middleware/photo';
import weatherMiddleware from './middleware/weather';
import cache from './middleware/redis';

const router = new KoaRouter();

router.get('/', cache(10), helloMiddleware);
router.get('/latest_photos', cache(10), latestPhotosMiddleware);
router.get('/weather', weatherMiddleware);


export default router;
