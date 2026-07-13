const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // In this specific case, we don't have a User model, 
            // we just verify if the email matches the admin email from .env
            if (decoded.email === process.env.ADMIN_EMAIL) {
                req.admin = decoded;
                next();
            } else {
                res.status(401).json({ message: 'Not authorized, admin access only' });
            }
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
