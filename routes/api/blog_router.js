const Router = require('koa-router')
const router = new Router()
const blog_controller = require('./../../app/controllers/blog_controller')

router.get('/blog/get', blog_controller.get)
router.post('/blog/create', blog_controller.create)
router.get('/blog/list', blog_controller.list)
router.get('/blog/:id',blog_controller.getOne)

module.exports = router
