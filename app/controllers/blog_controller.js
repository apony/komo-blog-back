const Blog_col = require('./../models/blog');
const Counter_col = require('./../models/colletCounter')
const common = require('./../utils/common');

// 测试接口
const get = async (ctx, next) => {
    ctx.status = 200;
    console.log('getting blog...')
    const blog = await Blog_col.find({});
    ctx.body = {
        success: true,
        msg: 'get blog success',
        data: {
            item: blog
        }
    }
}

// 新增博客
const add = async (ctx, next) => {
    const req = ctx.request.body;

    // 暂时先用自带的id
    // let blogCollection = await Counter_col.find({
    //     collectionName: 'blog'
    // });
    //
    // if(!blogCollection){
    //     blogCollection = await Counter_col.create({
    //         collectionName: 'blog'
    //     });
    // }

    ctx.status = 200;
    const newBlog = await Blog_col.create({
        // _id: blogCollection.idCount++,
        userId: req.userId,
        title: req.title,
        content: req.content,
        createTime: common.dateFormat(new Date())
    });

    if(newBlog) {
        ctx.body = {
            success: true,
            msg: '发表成功',
            data: {
                blogId: newBlog._id,
                userId: newBlog.userId
            }
        }
    }else {
        ctx.body = {
            success: false,
            msg: '发表失败'
        }
    }
}

module.exports = {
    get,
    add
}
