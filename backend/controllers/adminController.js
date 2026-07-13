const jwt = require('jsonwebtoken');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.json({
            email,
            token,
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { adminLogin };
