const express = require('express');
const router = express.Router();

const { passport, generateToken } = require('../Service/GithubAuth');
const userController = require('../UserControllar/UserControllar');
const jwt = require('jsonwebtoken');

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    // Set JWT token in cookie
    const token = generateToken(req.user);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/profile');
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

module.exports = router;
