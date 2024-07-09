import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, 'secretkey', { expiresIn: '1h' });
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password }); 
    await user.save();
    const token = generateToken(user._id);

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user._id);

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};
