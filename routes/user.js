import express from "express";
import { login, logout, register } from "../controllers/user.js";
import { isAuthentiated } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(isAuthentiated, logout);

export default userRouter;
