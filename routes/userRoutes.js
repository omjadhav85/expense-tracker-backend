import express from 'express';
import { signupController } from '../controllers/userControllers.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/signup', expressAsyncHandler(signupController));

export default router;
