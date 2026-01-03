import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//generate a JWT secret
//node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

export const getUsers = async(req,res,next) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        next(error);
    }
};  
export const addUser = async(req, res,next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        next(error);
    }
};


export const signupUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
     .then(hash => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        user.save()
            .then( () => {
                res.status(201).json({
                    message: 'User created successfully!'
                });
            })
            .catch(err => {
                res.status(400).json({
                    error: err
                });
            });
     })
     .catch(err => {
        res.status(500).json({
            error:err
        });
     });
};


export const loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ message: 'Authentication failed!' });
            }else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid) {
                            res.status(401).json({ message: 'Authentication failed!' });
                        }else{
                            res.status(200).json({
                                userId: user._id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.jwtSecret,
                                    { expiresIn: '24h' }
                                )
                            });
                        }   
                    })
                    .catch(err => {
                        res.status(500).json({ error: err });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({error: err});
        })
};

export default {
   signupUser,
   loginUser,
   getUsers,
   addUser,
};