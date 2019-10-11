const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    // _id由数据库自动生成
    // _id: {
    //     type: Number,
    //     unique: true,
    //     require: true
    // },
    account: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    nickname: {
        type: String,
        unique: true,
        sparse: true
    },
    gender: {
        type: String
    },
    phoneNumber: {
        type: Number,
        unique: true,
        sparse: true
    },
    registerTime: {
        type: Date
    },
    email: {
        type: String
    },
    avatarUrl: {
        type: String
    },
    introduction: {
        type: String
    },
    level: {
        type: Number
    },
    coin: {
        type: Number
    }
}, { collection: 'user', versionKey: false});

module.exports = mongoose.model('user', UserSchema);
