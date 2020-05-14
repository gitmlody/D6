const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        default: "unknow"
    }
});

module.exports = mongoose.model('User', UserSchema);