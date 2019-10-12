// 记录集合的长度，新增数据时以count+1作为_id
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const collectCounterSchema = new Schema({
    collectionName: {
        type: String,
        require: true
    },
    idCount: {
        type: Number,
        default: 0
    }
}, { collection: 'collectCounter', versionKey: false});

module.exports = mongoose.model('collectCounter', collectCounterSchema);
