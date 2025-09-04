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
    }
});


module.exports = mongoose.model('User', UserSchema);
