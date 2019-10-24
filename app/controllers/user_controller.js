const User_col = require('./../models/user')
const common = require('./../utils/common')
const addtoken = require('../../token/addtoken')

// 注册
const register = async (ctx, next) => {
  const req = ctx.request.body

  // 查询用户名是否重复
  const user = await User_col.findOne({
    account: req.account
  })

  ctx.status = 200
  if (user) {
    ctx.body = {
      success: false,
      msg: '用户名重复'
    }
    return
  }

  // 插入新用户 暂时不加密密码
  const newUser = await User_col.create({
    id: await common.getNextSequence('user'),
    account: req.account,
    password: req.password,
    registerTime: common.dateFormat(new Date())
  })

  if (newUser) {
    ctx.body = {
      success: true,
      msg: '注册成功',
      data: {
        id: newUser.id,
        account: newUser.account,
        registerTime: common.dateFormat(new Date(newUser.registerTime))
      }
    }
  } else {
    ctx.body = {
      success: false,
      msg: '注册失败'
    }
  }
}

// 登陆
const login = async (ctx, next) => {
  const req = ctx.request.body

  const user = await User_col.findOne({
    account: req.account
  })
  ctx.status = 200
  if (user) {
    if (user.password === req.password) {
      let token = addtoken({ user: req.account })
      ctx.body = {
        success: true,
        msg: '登陆成功',
        data: {
          token,
          id: user.id,
          account: user.account,
          nickname: user.nickname,
          gender: user.gender,
          phoneNumber: user.phoneNumber,
          registerTime: common.dateFormat(new Date(user.registerTime)),
          email: user.email,
          avatarUrl: user.avatarUrl,
          introduction: user.introduction,
          level: user.level,
          coin: user.coin
        }
      }
    } else {
      ctx.body = {
        success: false,
        msg: '密码错误'
      }
    }
  } else {
    ctx.body = {
      success: false,
      msg: '用户不存在'
    }
  }
}

// 修改(部分)个人信息
const update = async (ctx, next) => {
  const req = ctx.request.body

  let data = {}
  let updateField = [
    'nickname',
    'gender',
    'phoneNumber',
    'email',
    'avatarUrl',
    'introduction'
  ]
  updateField.forEach(field => {
    if (!!req[field]) {
      data[field] = req[field]
    }
  })

  const result = await User_col.updateOne(
    {
      id: req.id
    },
    data
  )

  ctx.status = 200
  if (result.nModified === 1) {
    ctx.body = {
      success: true,
      msg: '修改成功'
    }
  } else {
    ctx.body = {
      success: false,
      msg: '修改失败'
    }
  }
}

module.exports = {
  register,
  login,
  update
}
