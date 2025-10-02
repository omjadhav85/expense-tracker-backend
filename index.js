import express from "express";
import "dotenv/config";
import { expenses } from "./data/expenses.js";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";

await connectDB();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

app.use("/api/expenses", isAuthenticated, expenseRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to expense tracker api service" });
});

app.get("/api/health", (req, res) => {
  res.json({
    msg: "Hello from expense tracker backend",
    time: new Date().toISOString(),
  });
});

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log("Server started on port: ", PORT));
