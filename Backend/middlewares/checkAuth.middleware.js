const jwt = require('jsonwebtoken');

const checkAuth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing" });
        }

        if(!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT secret is not set" });
        }
        const jwtPayload = await jwt.verify(token, process.env.JWT_SECRET);
        if (!jwtPayload) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = jwtPayload
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = checkAuth;

