const User_col = require('./../models/user');

const get = async (ctx, next) => {
    ctx.status = 200;
    console.log('getting users...')
    const users = await User_col.find({});
    ctx.body = {
        msg: 'get users success',
        data: {
            item: users
        }
    }
}

module.exports = {
    get
}
