const Router = require('koa-router')
const router = new Router()
const blog_controller = require('./../../app/controllers/blog_controller')

router.get('/blog/get', blog_controller.get)
router.post('/blog/add', blog_controller.add)

module.exports = router
