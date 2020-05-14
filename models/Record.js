const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
    moveType:{
        type: String,
        required: true
    },
    moveNumber:{
        type: Number,
        required: true,
        default: 0
    },
    time: {
        type: Date,
        default: Date.now
    },
    quality: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model('Record',RecordSchema);