const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    id: {
        type: String,
        unique: true,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
}, { collection: 'user', versionKey: false});

module.exports = mongoose.model('user', UserSchema);
