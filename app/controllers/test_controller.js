// 测试用控制器

const get = async (ctx, next) => {
    ctx.status = 200;
    ctx.body = {
        msg: 'get request!!',
        data: {
            data: ctx.request.query
        }
    }
}

module.exports = {
    get
}
