// 记录集合的长度，新增数据时以sequence+1作为id
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const countersSchema = new Schema({
    collectionName: {
        type: String,
        unique: true,
        require: true
    },
    sequence: {
        type: Number,
        default: 0
    }
}, { collection: 'counters', versionKey: false});

module.exports = mongoose.model('counters', countersSchema);
