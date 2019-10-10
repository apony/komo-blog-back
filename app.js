// 先摸过来
const Koa = require('koa')
const config = require('./config')

// https://www.npmjs.com/package/koa2-cors
const cors = require('koa2-cors')

// https://www.npmjs.com/package/koa-bodyparser
const bodyParser = require('koa-bodyparser')

// https://github.com/Automattic/mongoose
const mongoose = require('mongoose')

const app = new Koa()

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
    }
  }
)

app.use(cors())
app.use(bodyParser())

/*自由发挥区-start*/
const test_router = require('./routes/api/test_router')
const user_router = require('./routes/api/user_router')

app.use(test_router.routes()).use(test_router.allowedMethods())
app.use(user_router.routes()).use(user_router.allowedMethods())
/*end*/

app.listen(config.port)
