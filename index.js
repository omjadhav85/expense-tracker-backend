import express from 'express';
import 'dotenv/config';
import { expenses } from './data/expenses.js';
import cors from 'cors';
import connectDB from './config/db.js';

await connectDB();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors());

app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.get('/api/expenses/:id', (req, res) => {
  const expense = expenses.find((obj) => obj._id === req.params.id);
  res.json(expense);
});

app.listen(PORT, () => console.log('Server started on port: ', PORT));
