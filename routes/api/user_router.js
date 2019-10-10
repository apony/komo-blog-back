const Router = require('koa-router');
const router = new Router();
const user_controller = require('./../../app/controllers/user_controller');

router.get('/user/get', user_controller.get);

module.exports = router;
