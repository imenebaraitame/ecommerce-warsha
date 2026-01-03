import jwt from 'jsonwebtoken';

const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(401).json({ 
            message: 'Access denied. No token provided. Please login first.' 
        });
    }
    jwt.verify(token, process.env.jwtSecret, (err, user) => {
       
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    message: 'Token expired. Please login again.' 
                });
            }
            
            return res.status(403).json({ 
                message: 'Invalid token.' 
            });
        }   
        req.user = user;
        next(); 
    });
}
export default authenticationToken;