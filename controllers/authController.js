// Using ES module import statements
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust the path as per your structure and make sure to add .js extension
import dotenv from 'dotenv';
'dotenv/config.js'


export const signup = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                const payload = { username: user.username };
                const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }); // Example: Expiring in 1 day
                res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful' });
            } else {
                res.status(400).json({ error: 'Password does not match' });
            }
        } else {
            res.status(400).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

export const logout = async (req, res) => { 
    res.clearCookie('token').json({ message: 'Logout successful' });
}

