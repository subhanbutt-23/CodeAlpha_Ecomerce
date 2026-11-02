const jwt = require("jsonwebtoken");

// Verify user authentication
const authMiddleware = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication required. Please log in."
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user ID to request
        req.userId = decoded.userId;

        // Continue to the protected route
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired authentication token"
        });
    }
};

module.exports = authMiddleware;