const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    userId: {
        type: String || Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
    },
    createTime: {
        type: Date
    },
    sortType: {
        type: String
    },
    keyword: {
        type: String
    },
    viewCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    likeCount: {
        type: Number,
        default: 0
    },
    coinCount: {
        type: Number,
        default: 0
    },
    collectCount: {
        type: Number,
        default: 0
    },
    coverUrl: {
        type: String
    }
}, { collection: 'blog', versionKey: false});

module.exports = mongoose.model('blog', BlogSchema);
