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
const create = async (ctx, next) => {
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

// 获取blog列表
const list = async (ctx, next) => {
    const req = ctx.query;
    ctx.status = 200;

    let pageSize = parseInt(req.pageSize || 10)
    let pageNum = parseInt(req.pageNum || 1)

    // 按条件搜索 比如标题 （好像find里只能在本集合中找对应字段，待小马哥研究）
    let searchObj = {}
    let searchFiled = ['userId']
    searchFiled.forEach(field => {
        if (!!req[field]) {
            searchObj[field] = req[field]
        }
    })

    // 按条件排序 默认按时间降序
    let createTimeOrderObj = {
        createTime: -1, // 1 = 升序，-1 = 降序
    }

    // 想要多条件排序就要多调用几次sort，这里放除了创建时间外的条件
    // 可选范围 ['createTime','likeCount','collectCount','coinCount','commentCount','viewCount']
    let orderObj = {}

    if(req.sort){
        // req.sort 由两部分组成 排序类型 + 升序/倒序('asc'/'desc')
        let sortArray = req.sort.split(' ')
        let sortField = sortArray[0]
        let order = sortArray[1] === 'desc' ? -1 : 1
        if(sortField === 'createTime'){
            createTimeOrderObj.createTime = order
        }else {
            orderObj[sortField] = order
        }

    }

    let totalItemCount = await Blog_col.countDocuments(searchObj)

    let blogList = [];
    if(totalItemCount > 0){
        // 执行顺序是sort > skip > limit
        // mongoose返回自己封装的一个对象，无法直接对其进行修改，需要加上.lean()
        blogList = await Blog_col.find(searchObj).skip((pageNum-1)*pageSize).limit(pageSize).sort(orderObj).sort(createTimeOrderObj).lean()
        if(blogList.length > 0){
            for(let item of blogList){
                item.createTime = common.dateFormat(new Date(item.createTime))
            }
        }
    }

    ctx.body = {
        success: true,
        msg: '获取博客列表成功',
        data: {
            items: blogList,
            pageSize,
            pageNum,
            totalItemCount,
            pageCount: Math.ceil(totalItemCount/pageSize),
        }
    }
}

// 获取单个blog
const getOne = async (ctx, next) => {
    const req = ctx.params

    // 这里找不到就直接返回404了
    const blog = await Blog_col.findOne({_id: req.id}).lean()

    ctx.status = 200
    if(blog){
        blog.createTime = common.dateFormat(new Date(blog.createTime))
        ctx.body = {
            success: true,
            msg: '成功',
            data: {
                item: blog
            }
        }
    }else{
        ctx.body = {
            success: false,
            msg: '没有查询到对应博客'
        }
    }
}

module.exports = {
    get,
    create,
    list,
    getOne
}
