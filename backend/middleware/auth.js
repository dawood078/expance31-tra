const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("Middleware Cookies:", req.cookies); // DEBUG LOG

        if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.user = verified;
        console.log("Middleware Verified User:", verified); // DEBUG LOG

        next();
    } catch (err) {
        console.error("Middleware Auth Error:", err.message);
        res.status(401).json({ message: "Unauthorized: Verification failed" });
    }
}

module.exports = auth;
