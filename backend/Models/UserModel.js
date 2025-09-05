const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    githubId: { type: String, unique: true },
    username: String,
    displayName: String,
    profileUrl: String,
    avatarUrl: String,
    bio: {
        type: String,
        default: ''
    },
    defaultPrivacy: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('User', UserSchema);
