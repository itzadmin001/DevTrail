const express = require("express");
const router = express.Router();

const { passport, generateToken } = require('../Service/GithubAuth');
const userController = require('../UserControllar/UserControllar');
const jwt = require('jsonwebtoken');

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    const token = generateToken(req.user);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    return res.redirect(`${clientUrl}/dashboard`);
});

router.get('/profile', (req, res, next) => {
    // Verify JWT from cookie
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'No token' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, username: decoded.username };
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}, userController.getProfile);

// public profile (no auth)
router.get("/public/:id", userController.GetPublicProfile);

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
