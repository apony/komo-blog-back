// 测试用表

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TestSchema = new Schema({
    id: {
        type: String,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    count: {
        type: Number
    }
}, { collection: 'test', versionKey: false});

module.exports = mongoose.model('test', TestSchema);
