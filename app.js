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
      console.log('Your server is begining! http://localhost:8000')
    }
  }
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
