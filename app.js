import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

config({
  path: "./config/config.env",
});

const app = express();

app.use(express.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import userRouter from "./routes/user.js";
import institutionRouter from "./routes/institution.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/institution", institutionRouter);

export default app;

import errorMiddleware from "./middlewares/error.js";
app.use(errorMiddleware);
