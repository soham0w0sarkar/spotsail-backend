import express from "express";
import { config } from "dotenv";

config({
  path: "./config/config.env",
});

const app = express();

app.use(express.json());

import userRouter from "./routes/user.js";
import institutionRouter from "./routes/institution.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/institution", institutionRouter);

export default app;

import errorMiddleware from "./middlewares/error.js";
app.use(errorMiddleware);
