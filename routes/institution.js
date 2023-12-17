import express from "express";
import { isAuthentiated } from "../middlewares/auth.js";
import { login, logout, register } from "../controllers/institution.js";

const institutionRouter = express.Router();

institutionRouter.route("/register").post(register);
institutionRouter.route("/login").post(login);
institutionRouter.route("/logout").get(isAuthentiated, logout);

export default institutionRouter;
