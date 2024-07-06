import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  createExpenseController,
  deleteExpenseController,
  getAllExpenseController,
  getExpenseByIdController,
  updateExpenseController,
} from '../controllers/expenseControllers.js';

const router = express.Router();

// to get all expenses of a user
router.get('/', expressAsyncHandler(getAllExpenseController));

// to get particular expense details
router.get('/:id', expressAsyncHandler(getExpenseByIdController));

router.post('/', expressAsyncHandler(createExpenseController));

router.put('/:id', expressAsyncHandler(updateExpenseController));

router.delete('/:id', expressAsyncHandler(deleteExpenseController));

export default router;
