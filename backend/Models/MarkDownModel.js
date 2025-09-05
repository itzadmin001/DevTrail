const mongoose = require('mongoose');


const markDownSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true

    },
    tags: {
        type: [String],
        default: []
    },
    content: {
        type: String,
        required: true
    },
    Visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    }
}, { timestamps: true })


const MarkDownModel = mongoose.model('MarkDown', markDownSchema);
module.exports = MarkDownModel;