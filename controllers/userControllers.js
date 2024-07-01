import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const signupController = async (req, res, next) => {
  const { name, email, password, pic } = req.body;

  //   check if a user with same email exists or not already
  const userExists = await User.findOne({ email });

  console.log('user: ', userExists);

  if (userExists) {
    console.log('user already exists...stop');
    res.status(400);
    throw new Error('User already exists');
  }

  console.log('user is new, continue...');

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error('Error creating user');
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Incomplete data provided');
  }

  //   check if a user with same email exists or not already
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error('User not found!');
  }

  const isPasswordCorrect = await user.matchPassword(password);

  if (isPasswordCorrect) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Incorrect password');
  }
};
