import experess from 'express';
import {
    signupUser, 
    loginUser,
    getUsers,  
    addUser,
} from '../controllers/userControllers.js';
import authenticationToken from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';
const router = experess.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/', authenticationToken,isAdmin, getUsers); 
router.post('/', addUser);



export default router;