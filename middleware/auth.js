import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate.' });
  }

  try {
    const decoded = jwt.verify(token, 'secretkey');
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;
