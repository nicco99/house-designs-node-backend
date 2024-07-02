import dotenv from 'dotenv';
import express from 'express';

import cors from "cors"
import morgan from "morgan"
import categories from "./routes/categories.js"
import plans from "./routes/plans.js"

const app = express();
dotenv.config();

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '251mb'}));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/plans", plans);
app.use("/categories", categories);
app.use((req, res, next) => {
  next({ status: 404, message: `Route ${req.originalUrl} is not defined` });
});

app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});
export default app;
