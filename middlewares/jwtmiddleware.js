const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("Inside JWT middleware");

    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Authorization token is missing." });

        const decoded = jwt.verify(token, 'supersecrectkey12345');
        req.payload = decoded.userId; // Extracting userId from payload
        next();
    } catch (err) {
        console.error("JWT Middleware Error:", err);
        res.status(401).json({ error: "Authorization failed, please login." });
    }
};

module.exports = jwtMiddleware;
