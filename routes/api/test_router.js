// 测试用路由

const Router = require('koa-router');
const router = new Router();
const test_controller = require('./../../app/controllers/test_controller');

router.get('/test/get', test_controller.get);

module.exports = router;
