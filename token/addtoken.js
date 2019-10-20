const jwt = require('jsonwebtoken')
const serectKey = require('../config').serectKey
module.exports = userinfo => {
  //创建token并导出(1天过期)
  const token = jwt.sign(
    {
      user: userinfo.user
    },
    serectKey,
    { expiresIn: 60 * 60 * 24 }
  )
  return token
}
