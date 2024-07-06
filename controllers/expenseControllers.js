import Expense from '../models/expenseModel.js';

export const getAllExpenseController = async (req, res, next) => {
  const response = await Expense.find({
    user: req.user._id,
  });
  res.status(200).json(response);
};

export const createExpenseController = async (req, res, next) => {
  const { title, description, amount } = req.body;

  if (!title || !amount) {
    res.status(400);

    throw new Error('Title and amount are required fields');
  }

  const newExpense = new Expense({
    title,
    description,
    amount,
    user: req.user._id,
  });

  const createdNote = await newExpense.save();

  res.status(201).json(createdNote);
};

export const getExpenseByIdController = async (req, res) => {
  const id = req.params.id;

  const foundExpense = await Expense.findById(id).exec();
  console.log('foundExpense: ', foundExpense);

  if (!foundExpense) {
    res.status(404);
    throw new Error('Expense with given id not found');
  }
  res.status(200).json(foundExpense);
};

export const updateExpenseController = async (req, res) => {
  const id = req.params.id;

  const expense = await Expense.findById(id).exec();

  if (!expense) {
    res.status(404);
    throw new Error('Expense with given id not found');
  }

  console.log('expense: ', expense);

  if (expense.user._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You don't have permission to update this expense");
  }

  const { title, description, amount } = req.body;

  if (!title || !amount) {
    res.status(400);

    throw new Error('Title and amount are required fields');
  }

  expense.title = title;
  expense.description = description;
  expense.amount = amount;

  const updatedExpense = await expense.save();

  res.json(updatedExpense);
};

export const deleteExpenseController = async (req, res) => {
  const id = req.params.id;

  const expense = await Expense.findById(id).exec();

  if (!expense) {
    res.status(404);
    throw new Error('Expense with given id not found');
  }

  if (expense.user._id.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You don't have permission to delete this expense");
  }

  const removedExpense = await expense.deleteOne();

  res.json(removedExpense);
};
