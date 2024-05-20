const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
var db = new PrismaClient();


const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(400).json('unauthorized token'); // Unauthorized if no token is provided
    }
    

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       // Check if the token is expired
       const currentTime = Math.floor(Date.now() / 1000);
       if (decoded.exp < currentTime) {
           return res.status(401).json({ message: 'Session expired' });
       }
        if (!decoded) {
            return res.status(400).json('Bad token'); // Unauthorized if no token is provided
        }
        // Check if the token exists in the database
        const storedToken = await db.token.findFirst({ where: { token } });
        if (!storedToken) {
            return res.status(400).json("Bad Token"); // Unauthorized if token is not found
        }

        

       
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(403).json("Error generating token"); // Forbidden if token verification fails
    }
};

module.exports = authenticateToken;
