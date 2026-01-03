import User from '../models/User.js';


async function isAdmin(req, res, next) {
    try {
        const requester = await User.findById(req.user.userId).select('role');
      
        if(!requester) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (requester.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        next();
    } catch (error) {
        next(error);
    }   
}
export default isAdmin;