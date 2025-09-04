const User = require('../Models/UserModel');

exports.getProfile = async (req, res) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            profileUrl: user.profileUrl,
            avatarUrl: user.avatarUrl
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
