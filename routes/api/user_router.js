const Router = require('koa-router');
const router = new Router();
const user_controller = require('./../../app/controllers/user_controller');

router.get('/user/get', user_controller.get);
router.post('/user/register', user_controller.register);
router.post('/user/login', user_controller.login);
router.post('/user/update', user_controller.update);

module.exports = router;
