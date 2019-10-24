const Koa = require('koa')
const config = require('./config')
const koajwt = require('koa-jwt')
const secret = require('./config').serectKey
const errorHandle = require('./app/middlewares/errorHandle')

// https://www.npmjs.com/package/koa2-cors
const cors = require('koa2-cors')

// https://www.npmjs.com/package/koa-bodyparser
const bodyParser = require('koa-bodyparser')

// https://github.com/Automattic/mongoose
const mongoose = require('mongoose')

const app = new Koa()

// 连接数据库
mongoose.set('useCreateIndex', true)
mongoose.connect(
  config.db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log(err)
      console.error('Failed to connect to database')
    } else {
      console.log('Connecting database successfully')
      console.log('Your server is begining! http://localhost:8000')
    }
  }
)

// 错误处理
app.use(errorHandle())

// token鉴权(unless指定哪些URL不需要进行token验证)
app.use(
  koajwt({
    secret
  }).unless({
    path: [/\/user\/login/, /\/user\/register/, /\/blog\/list/, /\/blog\/\d/]
  })
)
app.use(cors())
app.use(bodyParser())

/*自由发挥区-start*/
const user_router = require('./routes/api/user_router')
const blog_router = require('./routes/api/blog_router')

app.use(user_router.routes()).use(user_router.allowedMethods())
app.use(blog_router.routes()).use(blog_router.allowedMethods())
/*end*/

app.listen(config.port)
