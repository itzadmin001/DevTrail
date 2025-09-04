const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../Models/UserModel');
const jwt = require('jsonwebtoken');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            user = await User.create({
                githubId: profile.id,
                username: profile.username,
                displayName: profile.displayName,
                profileUrl: profile.profileUrl,
                avatarUrl: profile.photos[0]?.value
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = { passport, generateToken };
