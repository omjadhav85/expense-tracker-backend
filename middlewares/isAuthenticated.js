import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401);
    throw new Error('Token not found!');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foundUser = await User.findById(decoded.id).select('-password');

    req.user = foundUser;

    next();
  } catch (err) {
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});
