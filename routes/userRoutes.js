import express from 'express';
import {
  loginController,
  signupController,
} from '../controllers/userControllers.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/signup', expressAsyncHandler(signupController));

router.post('/login', expressAsyncHandler(loginController));

export default router;
